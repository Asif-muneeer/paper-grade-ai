// lib/reteach.js — Reteach worksheet generator (Feature 1).
// From the 3 most-missed questions it builds a printable practice worksheet:
// 2 practice items per missed question (same topic/style), answer key on
// page 2. Demo: deterministic templates built from the original question
// text — no new AI call. Live: lib/ai.js reteachItems() generates similar
// items with OpenAI, falling back to these templates on error.
export function demoPracticeItems(q) {
  const topic = q.topic || "this topic";
  const items = [];
  if (q.type === "mcq") {
    items.push({ no: 1, text: `Practice (same idea as Q${q.no}): ${q.text} — write the correct option and one sentence explaining WHY it is correct.`, answer: q.correctAnswer ? `Correct option: ${q.correctAnswer}. Explain the reason in your own words.` : "Check the answer key in your class notes." });
    items.push({ no: 2, text: `Quick check on ${topic}: give one example of your own that shows the same idea as Q${q.no}, and explain it in 2 sentences.`, answer: "Teacher checks: the example must show the same idea as Q" + q.no + "." });
  } else if (q.type === "math") {
    items.push({ no: 1, text: `Practice (same steps as Q${q.no}): ${q.text} — show EVERY step, then circle your final answer.`, answer: q.correctAnswer ? `Final answer: ${q.correctAnswer}. Full marks need the steps, not just the answer.` : "See the worked solution on the board." });
    items.push({ no: 2, text: `Make up your own problem like Q${q.no} with different numbers, solve it step by step, and swap with a partner to check.`, answer: "Teacher checks the steps, not just the final number." });
  } else {
    items.push({ no: 1, text: `Practice (same idea as Q${q.no}): ${q.text} — answer again, this time using the key words from the model answer.`, answer: q.modelAnswer ? `Key points: ${q.modelAnswer}` : "See the model answer in your notes." });
    items.push({ no: 2, text: `Explain Q${q.no} to a partner in your own words (${topic}). Then write your explanation in 2–3 sentences.`, answer: "Teacher checks: explanation must use the key words from the model answer." });
  }
  return items;
}
export function generateReteach(test, analytics) {
  const missed = (analytics?.mostMissed || []).slice(0, 3);
  const sections = missed.map((m) => {
    const q = (test.questions || []).find((x) => x.id === m.questionId) || {};
    return { questionNo: m.no, topic: m.topic, text: m.text, avgPct: m.avgPct, items: demoPracticeItems({ ...q, topic: m.topic }) };
  });
  return {
    testSubject: test.subject, className: test.className || "",
    generatedAt: new Date().toISOString(),
    focus: missed.map((m) => `Q${m.no} — ${m.topic} (${m.avgPct}% class average)`),
    sections,
    note: "Reteach worksheet — practice only. Do not grade it with the same key; check it together in class.",
  };
}
