// lib/ai.js — Vision grading. Real OpenAI when OPENAI_API_KEY is set, otherwise
// the built-in DEMO grader (lib/grading.js rules). Demo vs live is labelled
// everywhere in the UI. No student data is ever used to train a model; the live
// call sends only the paper image + key/rubric for that one grading job.
// Live path: GPT-4o vision reads the uploaded image and returns JSON per question.
// On any error it falls back to the demo grader — grading never hard-fails.
import fs from "fs";
import { gradePaper, demoAnswers } from "./grading.js";
export function aiMode() { return process.env.OPENAI_API_KEY ? "live" : "demo"; }
async function openAIGrade(test, imageBase64, mime) {
  const prompt = `You grade a student's handwritten/printed test paper. Return ONLY JSON: {"answers":[{"questionId":"...","answer":"..."}]}. Questions: ${test.questions.map((q) => `${q.id}: Q${q.no} (${q.type}) ${q.text}`).join(" | ")}. Read the student's answer for each question from the image. If you cannot read one, use "".`;
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4o-mini", temperature: 0, response_format: { type: "json_object" }, messages: [{ role: "user", content: [{ type: "text", text: prompt }, { type: "image_url", image_url: { url: `data:${mime};base64,${imageBase64}` } }] }] }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}`);
  const data = await res.json();
  const parsed = JSON.parse(data.choices[0].message.content);
  return parsed.answers || [];
}
async function openAIText(prompt) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4o-mini", temperature: 0.2, messages: [{ role: "user", content: prompt }] }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}`);
  const data = await res.json();
  return data.choices[0].message.content || "";
}
// Live Spanish translation of one feedback line; demo mode / error -> null
// (caller falls back to the template dictionary in lib/feedback.js).
export async function translateFeedback(text) {
  if (aiMode() !== "live") return null;
  try { return (await openAIText(`Translate this short teacher feedback into plain Spanish for a US school parent/student. Return ONLY the Spanish sentence, no quotes: "${text}"`)).trim(); } catch { return null; }
}
// Live reteach items: 2 practice items per missed question as JSON.
// Returns null on any failure so the caller falls back to demo templates.
export async function reteachItemsLive(missed) {
  if (aiMode() !== "live") return null;
  try {
    const out = await openAIText(`You write reteach practice for US K-12 teachers. Return ONLY JSON: {"sections":[{"questionNo":1,"items":[{"text":"...","answer":"..."},{"text":"...","answer":"..."}]}]}. Missed questions: ${missed.map((m) => `Q${m.no} (${m.topic}): ${m.text}`).join(" | ")}. Two short practice items per question, same topic, different numbers/words, with a short answer key.`);
    return JSON.parse(out).sections || null;
  } catch { return null; }
}
export async function gradePaperWithAI(test, paper) {
  if (aiMode() === "live" && paper.filePath && paper.fileType && paper.fileType.startsWith("image/")) {
    try {
      const b64 = fs.readFileSync(paper.filePath).toString("base64");
      const answers = await openAIGrade(test, b64, paper.fileType);
      if (answers.length) return { grading: gradePaper(test, answers), mode: "live", answers };
    } catch (e) { /* fall through to demo */ }
  }
  // Demo (or PDF, or live failed): use transcribed answers if the teacher entered
  // them, otherwise deterministic demo answers so the flow is fully testable.
  const answers = (paper.answers && paper.answers.length) ? paper.answers : demoAnswers(test);
  return { grading: gradePaper(test, answers), mode: "demo", answers };
}
