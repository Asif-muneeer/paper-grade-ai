"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RUBRICS, rubricById } from "@/lib/rubrics";
const EMPTY_Q = { type: "mcq", text: "", marks: 2, correctAnswer: "", modelAnswer: "", rubric: "", topic: "", finalMarks: 1, steps: [] };
const EMPTY_STEP = { label: "Step 1: Setup", marks: 2, keywords: "" };
export default function Tests() {
  const [tests, setTests] = useState([]);
  const [subject, setSubject] = useState(""); const [className, setClassName] = useState("");
  const [rubricId, setRubricId] = useState("");
  const [qs, setQs] = useState([{ ...EMPTY_Q, text: "Which planet is known as the Red Planet?", correctAnswer: "B" }, { ...EMPTY_Q, type: "short", text: "Explain why the Moon looks different over a month.", marks: 5, modelAnswer: "The Moon orbits Earth and sunlight lights different parts of its surface as it moves, so we see changing phases.", rubric: "Orbit (2), sunlight (2), phases (1)" }]);
  const [msg, setMsg] = useState("");
  const load = () => fetch("/api/tests").then((r) => r.json()).then((d) => setTests(d.tests || []));
  useEffect(load, []);
  function setQ(i, patch) { setQs(qs.map((q, j) => (j === i ? { ...q, ...patch } : q))); }
  function applyRubric(id) {
    setRubricId(id);
    const r = rubricById(id);
    if (!r) return;
    // Auto-fill rubric guidance into every short-answer question that has no
    // rubric yet, and note the library in the message. Teacher can edit all.
    setQs(qs.map((q) => q.type === "short" && !q.rubric ? { ...q, rubric: r.criteria.map((c) => `${c.name} (${c.marks})`).join(", ") } : q));
    setMsg(`${r.name} applied, criteria filled into short-answer rubrics. Edit any of them before creating the test.`);
  }
  function setStep(qi, si, patch) { setQs(qs.map((q, j) => j === qi ? { ...q, steps: (q.steps || []).map((s, k) => k === si ? { ...s, ...patch } : s) } : q)); }
  async function create(e) { e.preventDefault(); setMsg(""); const r = await fetch("/api/tests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ subject, className, rubricLibraryId: rubricId, questions: qs }) }); const d = await r.json(); if (!r.ok) return setMsg(d.error); setMsg("Test created."); setSubject(""); setClassName(""); setRubricId(""); load(); }
  return (<div><h2>Tests</h2>
    <div className="list-group mb-4">{tests.map((t) => <Link key={t.id} className="list-group-item list-group-item-action" href={`/dashboard/tests/${t.id}`}>{t.subject}: {t.className} · {t.questions.length} questions · {t.totalMarks} marks</Link>)}{tests.length === 0 && <p className="text-muted">No tests yet. The demo account already has one, log in as demo@teacherpaper.com / demo1234 to see it.</p>}</div>
    <h4>Create a test</h4>{msg && <div className="alert alert-info">{msg}</div>}
    <form onSubmit={create} className="card p-3 d-grid gap-3">
      <div className="row g-2"><div className="col-md-7"><input className="form-control" placeholder="Subject, e.g. Grade 7 Science" required value={subject} onChange={(e) => setSubject(e.target.value)} /></div><div className="col-md-5"><input className="form-control" placeholder="Class, e.g. 7B" value={className} onChange={(e) => setClassName(e.target.value)} /></div></div>
      <div><label className="form-label mb-1">Rubric library (optional, STAAR / AP / Regents, auto-fills short-answer rubrics)</label>
        <select className="form-select" value={rubricId} onChange={(e) => applyRubric(e.target.value)}><option value="">No library, write my own rubric</option>{RUBRICS.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}</select>
        {rubricId && <p className="small text-muted mt-1">{rubricById(rubricId)?.guidance} Criteria: {rubricById(rubricId)?.criteria.map((c) => `${c.name} (${c.marks})`).join(" · ")}.</p>}
      </div>
      {qs.map((q, i) => (<div key={i} className="border rounded p-3 d-grid gap-2"><div className="d-flex justify-content-between"><strong>Question {i + 1}</strong><button type="button" className="btn btn-sm btn-outline-danger" onClick={() => setQs(qs.filter((_, j) => j !== i))}>Remove</button></div>
        <select className="form-select" value={q.type} onChange={(e) => setQ(i, { type: e.target.value })}><option value="mcq">Multiple choice (A/B/C/D)</option><option value="fill">Fill-in-the-blank / one word</option><option value="short">Short answer / essay (rubric)</option><option value="math">Maths, final answer + step grading (partial credit)</option></select>
        <input className="form-control" placeholder="Question text" required value={q.text} onChange={(e) => setQ(i, { text: e.target.value })} />
        <input className="form-control" placeholder="Topic (for analytics, e.g. Algebra, Photosynthesis)" value={q.topic || ""} onChange={(e) => setQ(i, { topic: e.target.value })} />
        <div className="row g-2"><div className="col-4"><input className="form-control" type="number" min="1" placeholder="Marks" value={q.marks} onChange={(e) => setQ(i, { marks: e.target.value })} /></div><div className="col-8">{q.type === "short" ? <input className="form-control" placeholder="Model answer (for rubric scoring)" value={q.modelAnswer} onChange={(e) => setQ(i, { modelAnswer: e.target.value })} /> : <input className="form-control" placeholder="Correct / final answer, e.g. B, chloroplast, x = 4" value={q.correctAnswer} onChange={(e) => setQ(i, { correctAnswer: e.target.value })} />}</div></div>
        {q.type === "short" && <input className="form-control" placeholder="Rubric, e.g. Orbit (2), sunlight (2), phases (1)" value={q.rubric} onChange={(e) => setQ(i, { rubric: e.target.value })} />}
        {q.type === "math" && (<div className="d-grid gap-2"><div className="row g-2"><div className="col-6"><label className="form-label small mb-0">Final-answer marks (of the total above)</label><input className="form-control" type="number" min="0" value={q.finalMarks ?? 1} onChange={(e) => setQ(i, { finalMarks: e.target.value })} /></div><div className="col-6"><span className="small text-muted">Steps below share the remaining marks. Final answer is scored exactly; steps get partial credit.</span></div></div>
          {(q.steps || []).map((s, si) => (<div key={si} className="row g-2"><div className="col-md-4"><input className="form-control" placeholder="Step label" value={s.label} onChange={(e) => setStep(i, si, { label: e.target.value })} /></div><div className="col-md-2"><input className="form-control" type="number" min="0" placeholder="Marks" value={s.marks} onChange={(e) => setStep(i, si, { marks: e.target.value })} /></div><div className="col-md-6"><input className="form-control" placeholder="Expected working keywords, e.g. subtract 6 both sides" value={s.keywords} onChange={(e) => setStep(i, si, { keywords: e.target.value })} /></div></div>))}
          <div><button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setQ(i, { steps: [...(q.steps || []), { ...EMPTY_STEP, label: `Step ${(q.steps || []).length + 1}: Working` }] })}>+ Add step (max 3)</button></div>
        </div>)}
      </div>))}
      <div><button type="button" className="btn btn-outline-secondary" onClick={() => setQs([...qs, { ...EMPTY_Q }])}>+ Add question</button></div>
      <button className="btn btn-primary">Create test</button>
    </form></div>);
}
