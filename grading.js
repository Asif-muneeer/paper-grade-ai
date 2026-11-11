// lib/grading.js — pure, testable grading rules. No AI call here.
// MCQ / fill-in: deterministic match vs the answer key = near 100% on clean input.
// Short answer: rubric draft — keyword overlap vs the model answer, proportional
// marks, a reason, and a confidence flag. NEVER auto-finalise: the teacher
// approves every grade in the review grid.
export function norm(s) { return String(s || "").trim().toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " "); }
export function gradeQuestion(q, answer) {
  const ans = String(answer || "").trim();
  const max = Number(q.marks || 0);
  if (q.type === "mcq" || q.type === "fill") {
    if (!ans) return { mark: 0, confidence: "Low", reason: "No answer recognised — check the paper." };
    const ok = norm(ans) === norm(q.correctAnswer) || norm(ans).startsWith(norm(q.correctAnswer)) && norm(q.correctAnswer).length === 1;
    return ok
      ? { mark: max, confidence: "High", reason: `Matches the answer key (${q.correctAnswer}).` }
      : { mark: 0, confidence: "High", reason: `Answer key says ${q.correctAnswer}; recognised answer was "${ans}".` };
  }
  // math: final answer is deterministic, steps get partial credit.
  // q.steps = [{ label, marks, keywords }] ; q.finalMarks = marks for the
  // final answer alone (default 1). Total is capped at q.marks. Draft only.
  if (q.type === "math") {
    const steps = Array.isArray(q.steps) ? q.steps : [];
    const finalMarks = Number(q.finalMarks ?? 1);
    const stepResults = steps.map((s) => {
      const keys = norm(s.keywords || s.model || "").split(" ").filter((w) => w.length > 2);
      const uniq = [...new Set(keys)];
      const hit = uniq.filter((w) => norm(ans).includes(w)).length;
      const ratio = uniq.length ? hit / uniq.length : 0;
      const m = Math.round(Number(s.marks || 0) * ratio * 10) / 10;
      return { label: s.label || "Step", mark: m, max: Number(s.marks || 0), confidence: ratio >= 0.8 ? "High" : ratio >= 0.4 ? "Medium" : "Low", reason: `Step draft: matched ${hit} of ${uniq.length} key points. Teacher to approve.` };
    });
    const finalOk = ans && q.correctAnswer ? norm(ans).includes(norm(q.correctAnswer)) : false;
    const finalMark = finalOk ? finalMarks : 0;
    const mark = Math.min(max, Math.round((finalMark + stepResults.reduce((s, x) => s + x.mark, 0)) * 10) / 10);
    const conf = stepResults.length ? (stepResults.every((x) => x.confidence === "High") && finalOk ? "High" : stepResults.some((x) => x.confidence === "Low") ? "Low" : "Medium") : (finalOk ? "High" : "Low");
    return { mark, confidence: conf, reason: `Math draft: final answer ${finalOk ? "matches" : "does not match"} the key (${q.correctAnswer || "—"}); steps scored with partial credit. Teacher to approve.`, steps: stepResults, finalMark, finalMax: finalMarks };
  }
  // short answer / essay: rubric draft
  if (!ans) return { mark: 0, confidence: "Low", reason: "No answer recognised — check the paper." };
  const keywords = norm(q.modelAnswer || "").split(" ").filter((w) => w.length > 3);
  const unique = [...new Set(keywords)];
  const hit = unique.filter((w) => norm(ans).includes(w)).length;
  const ratio = unique.length ? hit / unique.length : 0;
  const mark = Math.round(max * ratio * 10) / 10;
  const confidence = ratio >= 0.8 ? "High" : ratio >= 0.4 ? "Medium" : "Low";
  const reason = `Rubric draft: matched ${hit} of ${unique.length} key points from the model answer (${q.rubric || "see rubric"}). Teacher to approve.`;
  return { mark, confidence, reason };
}
export function gradePaper(test, answers) {
  const byId = {};
  (answers || []).forEach((a) => { byId[a.questionId] = a.answer; });
  const rows = test.questions.map((q) => {
    const g = gradeQuestion(q, byId[q.id]);
    return { questionId: q.id, no: q.no, type: q.type, text: q.text, recognised: String(byId[q.id] || ""), mark: g.mark, max: Number(q.marks || 0), confidence: g.confidence, reason: g.reason, steps: g.steps || null, finalMark: g.finalMark ?? null, finalMax: g.finalMax ?? null };
  });
  const total = rows.reduce((s, r) => s + r.mark, 0);
  const maxTotal = rows.reduce((s, r) => s + r.max, 0);
  return { rows, total, maxTotal, gradedAt: new Date().toISOString() };
}
export function demoAnswers(test, mode = "mixed") {
  // Deterministic demo answers for the "Use demo answers" button and for grading
  // a paper when the teacher has not transcribed answers yet. Mixed = most MCQ
  // right, one wrong, short answers partial — so the review grid shows both
  // High and Low confidence rows.
  return test.questions.map((q, i) => {
    if (q.type === "mcq" || q.type === "fill") {
      if (mode === "all-correct") return { questionId: q.id, answer: q.correctAnswer };
      if (i === 1) return { questionId: q.id, answer: q.type === "mcq" ? (q.correctAnswer === "A" ? "B" : "A") : "wrong" };
      return { questionId: q.id, answer: q.correctAnswer };
    }
    if (q.type === "math") {
      const steps = Array.isArray(q.steps) ? q.steps : [];
      const stepText = steps.map((s) => s.keywords || s.model || "").join(" ");
      if (mode === "all-correct") return { questionId: q.id, answer: `${stepText} ${q.correctAnswer || ""}`.trim() };
      if (i % 2 === 0) return { questionId: q.id, answer: `${stepText} ${q.correctAnswer || ""}`.trim() };
      return { questionId: q.id, answer: stepText.split(" ").slice(0, 4).join(" ") };
    }
    if (mode === "all-correct") return { questionId: q.id, answer: q.modelAnswer || "" };
    if (i % 2 === 0) return { questionId: q.id, answer: q.modelAnswer || "" };
    return { questionId: q.id, answer: (q.modelAnswer || "").split(" ").slice(0, 4).join(" ") };
  });
}
