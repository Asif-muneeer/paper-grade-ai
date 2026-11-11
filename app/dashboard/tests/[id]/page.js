"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { WarningIcon } from "../../../components/icons";
export default function TestDetail({ params }) {
  const [data, setData] = useState(null);
  const [studentName, setStudentName] = useState(""); const [studentId, setStudentId] = useState("");
  const [file, setFile] = useState(null); const [answers, setAnswers] = useState({});
  const [splitFile, setSplitFile] = useState(null); const [splitNames, setSplitNames] = useState(""); const [splitRanges, setSplitRanges] = useState("");
  const [msg, setMsg] = useState(""); const [mode, setMode] = useState("");
  const [editing, setEditing] = useState({});
  const load = () => fetch(`/api/tests/${params.id}`).then((r) => r.json()).then(setData);
  useEffect(load, []);
  if (!data?.test) return <div className="py-5">Loading…</div>;
  const test = data.test, papers = data.papers || [];
  function fillDemoAnswers() { const a = {}; test.questions.forEach((q, i) => { a[q.id] = q.type === "short" ? (q.modelAnswer || "") : (q.correctAnswer || ""); }); setAnswers(a); setMsg("Demo answers filled, edit them to match the student's paper, then upload."); }
  async function upload(e) {
    e.preventDefault(); setMsg("");
    const fd = new FormData(); fd.append("testId", test.id); fd.append("studentName", studentName); fd.append("studentId", studentId);
    fd.append("answers", JSON.stringify(test.questions.map((q) => ({ questionId: q.id, answer: answers[q.id] || "" }))));
    if (file) fd.append("file", file);
    const r = await fetch("/api/papers", { method: "POST", body: fd }); const d = await r.json();
    if (!r.ok) return setMsg(d.error);
    setMsg("Paper uploaded. Now click Grade."); setStudentName(""); setStudentId(""); setFile(null); setAnswers({}); load();
  }
  async function splitUpload(e) {
    e.preventDefault(); setMsg("");
    const fd = new FormData(); fd.append("mode", "split"); fd.append("testId", test.id); fd.append("names", splitNames); fd.append("pageRanges", splitRanges);
    if (splitFile) fd.append("file", splitFile);
    const r = await fetch("/api/papers", { method: "POST", body: fd }); const d = await r.json();
    if (!r.ok) return setMsg(d.error);
    setMsg(`Split done, ${d.papers.length} papers created, one per name, in list order. ${d.note || ""}`); setSplitNames(""); setSplitRanges(""); setSplitFile(null); load();
  }
  async function grade(paperId) { setMsg("Grading…"); const r = await fetch(`/api/papers/${paperId}/grade`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" }); const d = await r.json(); if (!r.ok) return setMsg(d.error); setMode(d.mode); setMsg(`Draft grade ready (${d.mode === "live" ? "LIVE OpenAI" : "DEMO rules"}). Review it below, fix any flagged read, then approve.`); load(); }
  async function approve(paper) {
    const rows = (paper.grading?.rows || []).map((row) => ({ questionId: row.questionId, mark: editing[`${paper.id}:${row.questionId}`]?.mark ?? row.mark, recognised: editing[`${paper.id}:${row.questionId}`]?.recognised ?? row.recognised }));
    const r = await fetch(`/api/papers/${paper.id}/approve`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rows }) });
    const d = await r.json(); if (!r.ok) return setMsg(d.error); setMsg(`${paper.studentName} approved, result is now final.`); load();
  }
  async function del() { if (!confirm("Delete this test and all its papers?")) return; await fetch(`/api/tests/${test.id}`, { method: "DELETE" }); location.href = "/dashboard/tests"; }
  return (<div>
    <div className="d-flex flex-wrap justify-content-between gap-2"><h2>{test.subject}: {test.className}</h2><button className="btn btn-sm btn-outline-danger no-print" onClick={del}>Delete test + papers</button></div>
    <p className="text-muted">{test.questions.length} questions · {test.totalMarks} marks · Answer key + rubric set. <Link href={`/dashboard/results/${test.id}`}>View mark sheet &amp; CSV →</Link> · <Link href={`/dashboard/tests/${test.id}/analytics`}>Class Analytics &amp; Reteach →</Link></p>
    {msg && <div className="alert alert-info no-print">{msg}</div>}
    <h4>Upload a solved paper</h4>
    <form onSubmit={upload} className="card p-3 d-grid gap-2 mb-4 no-print">
      <div className="row g-2"><div className="col-md-6"><input className="form-control" placeholder="Student first name (only name/ID, FERPA)" required value={studentName} onChange={(e) => setStudentName(e.target.value)} /></div><div className="col-md-6"><input className="form-control" placeholder="Student ID (optional)" value={studentId} onChange={(e) => setStudentId(e.target.value)} /></div></div>
      <div><label className="form-label">Photo / PDF of the solved paper</label><input className="form-control" type="file" accept="image/*,application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} /></div>
      <details><summary>Transcribed answers (fallback, type what the student wrote, or use demo answers)</summary><div className="d-grid gap-2 mt-2">{test.questions.map((q) => (<div key={q.id} className="row g-2 align-items-center"><div className="col-md-6"><label className="form-label mb-0 small">Q{q.no}: {q.text}</label></div><div className="col-md-6"><input className="form-control" placeholder={q.type === "short" ? "Student's short answer" : "e.g. B"} value={answers[q.id] || ""} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })} /></div></div>))}<div><button type="button" className="btn btn-sm btn-outline-secondary" onClick={fillDemoAnswers}>Use demo answers</button></div></div></details>
      <button className="btn btn-primary">Upload paper</button>
    </form>
    <h4>Split a class PDF, one upload, one paper per student</h4>
    <form onSubmit={splitUpload} className="card p-3 d-grid gap-2 mb-4 no-print">
      <p className="small text-muted mb-0">Upload ONE multi-page PDF for the whole class + paste student names (one per line). The tool creates one paper per name, in list order (page 1 = first name, etc.). Optional page ranges, one per line, e.g. “Ava: 1-2”. No PDF pages are cut apart; the page mapping is stored on each paper so you can reassign it in review.</p>
      <div><label className="form-label">Class PDF (one file for the whole class)</label><input className="form-control" type="file" accept="application/pdf" onChange={(e) => setSplitFile(e.target.files?.[0] || null)} /></div>
      <div className="row g-2"><div className="col-md-6"><label className="form-label">Student names, one per line</label><textarea className="form-control" rows="3" placeholder={"Ava Johnson\nLiam Smith\nMaya Patel"} value={splitNames} onChange={(e) => setSplitNames(e.target.value)} /></div><div className="col-md-6"><label className="form-label">Page ranges, optional, one per line</label><textarea className="form-control" rows="3" placeholder={"Ava Johnson: 1-2\nLiam Smith: 3-4"} value={splitRanges} onChange={(e) => setSplitRanges(e.target.value)} /></div></div>
      <button className="btn btn-outline-primary">Split class PDF into papers</button>
    </form>
    <h4>Papers ({papers.length}), review grid</h4>
    {papers.length === 0 && <p className="text-muted">No papers yet. Upload one above, or use the demo account&apos;s pre-graded papers.</p>}
    {papers.map((p) => (<div key={p.id} className="card mb-3"><div className="card-body">
      <div className="d-flex flex-wrap justify-content-between gap-2"><strong>{p.studentName}{p.studentId ? ` (${p.studentId})` : ""}</strong><span className="badge bg-secondary">{p.status}{p.mode ? ` · ${p.mode}` : ""}</span></div>
      <p className="text-muted small mb-2">{p.fileName || "No file, transcribed answers only"} · {p.grading ? `Draft total: ${p.grading.total} / ${p.grading.maxTotal}` : "Not graded yet"}{p.splitInfo ? ` · Split from ${p.splitInfo.sourceFile}, pages ${p.splitInfo.pages.from}-${p.splitInfo.pages.to} (${p.splitInfo.position} of ${p.splitInfo.of})` : ""}</p>
      <div className="d-flex flex-wrap gap-2 mb-3 no-print"><button className="btn btn-sm btn-primary" onClick={() => grade(p.id)}>Grade / re-grade</button>{p.grading && p.status !== "approved" && <button className="btn btn-sm btn-success" onClick={() => approve(p)}>Approve result</button>}<Link className="btn btn-sm btn-outline-secondary" href={`/dashboard/results/${test.id}`}>Mark sheet</Link></div>
      {p.grading && (<div className="table-responsive"><table className="table table-bordered"><thead><tr><th>Q</th><th>Recognised answer</th><th>Mark</th><th>Confidence</th><th>Reason</th></tr></thead><tbody>{p.grading.rows.map((row) => { const low = row.confidence === "Low"; const ed = editing[`${p.id}:${row.questionId}`] || {}; return (<tr key={row.questionId} className={low ? "table-warning" : ""}><td>Q{row.no}<br /><span className="small text-muted">{row.type}</span></td><td>{p.status === "approved" ? row.recognised : <input className="form-control form-control-sm" defaultValue={row.recognised} onChange={(e) => setEditing({ ...editing, [`${p.id}:${row.questionId}`]: { ...ed, recognised: e.target.value, mark: ed.mark ?? row.mark } })} />}</td><td>{p.status === "approved" ? `${row.mark} / ${row.max}` : <input className="form-control form-control-sm" style={{ width: 70 }} type="number" step="0.5" min="0" max={row.max} defaultValue={row.mark} onChange={(e) => setEditing({ ...editing, [`${p.id}:${row.questionId}`]: { ...ed, mark: e.target.value, recognised: ed.recognised ?? row.recognised } })} />} / {row.max}</td><td>{low ? <span className="badge bg-danger"><WarningIcon size={13} /> Low, check paper</span> : <span className="badge bg-success">{row.confidence}</span>}</td><td className="small">{row.reason}{row.steps ? (<span><br /><strong>Steps:</strong> {row.steps.map((s) => `${s.label}: ${s.mark}/${s.max}`).join(" · ")}{row.finalMark !== null && row.finalMark !== undefined ? ` · Final answer: ${row.finalMark}/${row.finalMax}` : ""}</span>) : null}</td></tr>); })}</tbody></table></div>)}
    </div></div>))}
  </div>);
}
