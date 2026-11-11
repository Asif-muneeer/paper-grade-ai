// lib/feedback.js: Per-student feedback in English + Spanish (ESL).
// Demo mode: a built-in template dictionary for common feedback phrases, so
// a translation is never invented silently, the English line is ALWAYS shown
// alongside the Spanish line, so a wrong translation is never hidden.
// Live mode: lib/ai.js translateFeedback() uses OpenAI when a key is set,
// falling back to these templates on any error.
export const ES = {
  "Correct, well done.": "Correcto, bien hecho.",
  "Good effort, review this topic again.": "Buen esfuerzo, repasa este tema otra vez.",
  "Partial credit, you got part of it right.": "Crédito parcial, parte de tu respuesta es correcta.",
  "Not yet, check the paper and try again.": "Todavía no, revisa el examen e inténtalo de nuevo.",
  "No answer recognised, check the paper.": "No se reconoció una respuesta, revisa el examen.",
  "Great work on this test.": "Excelente trabajo en este examen.",
  "Good work, a few topics to review.": "Buen trabajo, hay algunos temas que repasar.",
  "Keep practising, review the reteach worksheet.": "Sigue practicando, repasa la hoja de repaso.",
  "Your result": "Tu resultado",
  "Review the questions below": "Repasa las preguntas siguientes",
};
export function translateLine(en) {
  if (ES[en]) return ES[en];
  return en; // unknown line: show English rather than a guessed translation
}
export function feedbackForPaper(paper, test) {
  const rows = (paper.grading?.rows || []).map((r) => {
    const ratio = r.max ? r.mark / r.max : 0;
    const en = ratio >= 1 ? "Correct, well done."
      : ratio >= 0.5 ? "Partial credit, you got part of it right."
      : r.mark === 0 && !r.recognised ? "No answer recognised, check the paper."
      : "Not yet, check the paper and try again.";
    return { no: r.no, text: r.text, mark: r.mark, max: r.max, en, es: translateLine(en), reason: r.reason || "" };
  });
  const pct = paper.grading?.maxTotal ? Math.round(((paper.grading.total || 0) / paper.grading.maxTotal) * 100) : 0;
  const overallEn = pct >= 80 ? "Great work on this test." : pct >= 50 ? "Good work, a few topics to review." : "Keep practising, review the reteach worksheet.";
  return {
    studentName: paper.studentName, studentId: paper.studentId || "",
    total: paper.grading?.total || 0, maxTotal: paper.grading?.maxTotal || 0, pct,
    overallEn, overallEs: translateLine(overallEn), rows,
  };
}
