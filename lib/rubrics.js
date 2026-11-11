// lib/rubrics.js — Pre-built US state-test rubric library.
// Picking one in the create-test form auto-fills rubric / model-answer
// guidance; the teacher can still edit everything. These are generic
// criterion summaries for classroom use, not the official scoring guides —
// the test page says so, and the teacher always approves the final grade.
export const RUBRICS = [
  { id: "staar-ela", name: "STAAR — Texas ELA (written response)", state: "Texas", subject: "ELA", criteria: [
    { name: "Ideas & organisation", marks: 4, descriptor: "Clear controlling idea, logical order, introduction and conclusion." },
    { name: "Evidence & support", marks: 3, descriptor: "Relevant evidence from the text, explained not just quoted." },
    { name: "Language & conventions", marks: 3, descriptor: "Precise vocabulary, varied sentences, correct spelling/grammar." } ],
    guidance: "Score the response against the three STAAR-style criteria above; quote the line that earned or lost each mark." },
  { id: "staar-math", name: "STAAR — Texas Maths", state: "Texas", subject: "Maths", criteria: [
    { name: "Setup", marks: 2, descriptor: "Correct equation / model chosen for the problem." },
    { name: "Working", marks: 2, descriptor: "Steps shown in order, no skipped key step." },
    { name: "Final answer", marks: 1, descriptor: "Correct answer with correct units." } ],
    guidance: "Use the Math step-grading question type: final answer is scored exactly, steps get partial credit." },
  { id: "fsa-ela", name: "FSA / FAST — Florida ELA", state: "Florida", subject: "ELA", criteria: [
    { name: "Claim & focus", marks: 3, descriptor: "Clear claim answering the prompt, stays on topic." },
    { name: "Evidence", marks: 3, descriptor: "Two or more pieces of text evidence, linked to the claim." },
    { name: "Conventions", marks: 2, descriptor: "Grammar, punctuation and spelling do not block meaning." } ],
    guidance: "Florida FAST-style: evidence must be linked to the claim, not listed alone." },
  { id: "regents-ny", name: "Regents — New York (ELA / general)", state: "New York", subject: "ELA", criteria: [
    { name: "Comprehension of texts", marks: 3, descriptor: "Accurate understanding of both texts." },
    { name: "Analysis & argument", marks: 3, descriptor: "Claim supported by analysis, not summary alone." },
    { name: "Conventions", marks: 2, descriptor: "Control of language and mechanics." } ],
    guidance: "Regents-style: the response must use BOTH texts, not one." },
  { id: "ap-lang", name: "AP English Language (FRQ)", state: "College Board", subject: "ELA", criteria: [
    { name: "Thesis", marks: 1, descriptor: "Defensible thesis that answers the prompt." },
    { name: "Evidence & commentary", marks: 4, descriptor: "Specific evidence with commentary explaining how it supports the line of reasoning." },
    { name: "Sophistication", marks: 1, descriptor: "Nuance, complexity or a mature writing style." } ],
    guidance: "AP Lang 0-6 scale compressed here to 6 marks: thesis 1, evidence/commentary 4, sophistication 1." },
  { id: "ap-calc", name: "AP Calculus AB (FRQ)", state: "College Board", subject: "Maths", criteria: [
    { name: "Setup", marks: 3, descriptor: "Correct integral / derivative setup with notation." },
    { name: "Working", marks: 3, descriptor: "Correct computation steps, units and reasoning shown." },
    { name: "Answer & justification", marks: 3, descriptor: "Correct final answer with justification (why, not just what)." } ],
    guidance: "AP Calc FRQ: justification earns marks — a bare answer does not. Use Math step grading." },
  { id: "ap-bio", name: "AP Biology (FRQ)", state: "College Board", subject: "Science", criteria: [
    { name: "Scientific claim", marks: 2, descriptor: "Correct claim using the right concept." },
    { name: "Evidence", marks: 3, descriptor: "Data / observations cited accurately." },
    { name: "Reasoning", marks: 2, descriptor: "Explains WHY the evidence supports the claim (mechanism)." },
    { name: "Conventions", marks: 1, descriptor: "Correct terminology and units." } ],
    guidance: "AP Bio: reasoning (the mechanism) is a separate criterion — do not give full marks for evidence alone." },
];
export function rubricById(id) { return RUBRICS.find((r) => r.id === id) || null; }
