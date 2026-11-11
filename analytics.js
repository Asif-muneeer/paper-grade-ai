// lib/analytics.js — Class Analytics. Pure + deterministic, no AI call.
// From APPROVED + GRADED papers it computes: class average, per-question
// % correct, most-missed questions (ranked), per-student mastery, and
// per-topic weakness. Topic = q.topic when the teacher set one, otherwise a
// simple keyword grouping of the question text (General fallback).
export function masteryLevel(pct) {
  if (pct >= 80) return "Mastered";
  if (pct >= 50) return "Developing";
  return "Needs support";
}
function topicOf(q) {
  if (q.topic && String(q.topic).trim()) return String(q.topic).trim();
  const t = String(q.text || "").toLowerCase();
  if (/moon|planet|photosynthesis|plant|water|cell|energy|science|chemical/.test(t)) return "Science";
  if (/solve|equation|algebra|fraction|geometry|angle|number|math|x\s*=/.test(t)) return "Maths";
  if (/essay|paragraph|sentence|grammar|reading|author|theme|language/.test(t)) return "English";
  if (/history|war|government|map|geography/.test(t)) return "Social Studies";
  return "General";
}
export function computeAnalytics(test, papers) {
  const graded = (papers || []).filter((p) => p.grading && p.grading.rows);
  const questions = test.questions || [];
  const perQuestion = questions.map((q) => {
    let attempted = 0, full = 0, marksGot = 0, marksMax = 0;
    graded.forEach((p) => {
      const row = p.grading.rows.find((r) => r.questionId === q.id);
      if (!row) return;
      attempted += 1; marksGot += row.mark; marksMax += row.max;
      if (row.mark >= row.max) full += 1;
    });
    const pctCorrect = attempted ? Math.round((full / attempted) * 100) : 0;
    const avgPct = marksMax ? Math.round((marksGot / marksMax) * 100) : 0;
    return { questionId: q.id, no: q.no, type: q.type, text: q.text, topic: topicOf(q), marks: Number(q.marks || 0), attempted, fullMarks: full, pctCorrect, avgPct };
  });
  const mostMissed = [...perQuestion].sort((a, b) => a.avgPct - b.avgPct).slice(0, 3);
  const mastery = graded.map((p) => {
    const total = p.grading.total || 0, max = p.grading.maxTotal || 1;
    const pct = Math.round((total / max) * 100);
    return { studentName: p.studentName, studentId: p.studentId || "", total, max, pct, level: masteryLevel(pct), status: p.status };
  }).sort((a, b) => a.pct - b.pct);
  const classAvg = graded.length ? Math.round((graded.reduce((s, p) => s + (p.grading.total || 0) / (p.grading.maxTotal || 1), 0) / graded.length) * 100) : 0;
  const byTopic = {};
  perQuestion.forEach((q) => {
    byTopic[q.topic] = byTopic[q.topic] || { topic: q.topic, questions: 0, avgSum: 0 };
    byTopic[q.topic].questions += 1; byTopic[q.topic].avgSum += q.avgPct;
  });
  const topics = Object.values(byTopic).map((t) => ({ topic: t.topic, questions: t.questions, avgPct: Math.round(t.avgSum / t.questions) })).sort((a, b) => a.avgPct - b.avgPct);
  return { papersCount: graded.length, classAvg, perQuestion, mostMissed, mastery, topics };
}
