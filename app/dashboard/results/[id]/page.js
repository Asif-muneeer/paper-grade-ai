"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { feedbackForPaper } from "@/lib/feedback";
// Results: mark sheet + per-student feedback EN + ES.
// Spanish comes from the template dictionary in lib/feedback.js (English is
// always shown alongside it); in live mode /api/tests/[id]/feedback tries
// OpenAI translation first and falls back to the templates.
export default function Results({ params }) {
  const [data, setData] = useState(null);
  const [lang, setLang] = useState("en");
  const [fb, setFb] = useState(null);
  useEffect(() => { fetch(`/api/tests/${params.id}`).then((r) => r.json()).then(setData); }, []);
  useEffect(() => { fetch(`/api/tests/${params.id}/feedback`).then((r) => r.json()).then((d) => { if (d.ok) setFb(d.feedback); }).catch(() => {}); }, []);
  if (!data?.test) return <div className="py-5">Loading…</div>;
  const test = data.test, papers = (data.papers || []).filter((p) => p.grading);
  const feedback = fb || papers.map((p) => feedbackForPaper(p, test));
  return (<div>
    <div className="d-flex flex-wrap justify-content-between gap-2 no-print"><h2>Mark sheet: {test.subject} ({test.className})</h2><div className="d-flex gap-2"><Link className="btn btn-outline-secondary" href={`/dashboard/tests/${test.id}/analytics`}>Class Analytics →</Link><a className="btn btn-primary" href={`/api/results/${test.id}/csv`}>Download CSV</a><button className="btn btn-outline-secondary" onClick={() => window.print()}>Print</button></div></div>
    <p className="text-muted">Approved results are final. Draft (unapproved) rows are marked as DRAFT.</p>
    <div className="table-responsive"><table className="table table-bordered bg-white"><thead><tr><th>Student</th><th>ID</th>{test.questions.map((q) => <th key={q.id}>Q{q.no} ({q.marks})</th>)}<th>Total / {test.totalMarks}</th><th>Status</th></tr></thead><tbody>
      {papers.map((p) => (<tr key={p.id}><td>{p.studentName}</td><td>{p.studentId}</td>{test.questions.map((q) => { const row = p.grading.rows.find((r) => r.questionId === q.id); return <td key={q.id}>{row ? row.mark : "-"}</td>; })}<td><strong>{p.grading.total}</strong></td><td>{p.status === "approved" ? "Approved" : "DRAFT"}</td></tr>))}
    </tbody></table></div>
    <div className="d-flex gap-2 align-items-center no-print"><strong>Feedback language:</strong><button className={`btn btn-sm ${lang === "en" ? "btn-primary" : "btn-outline-secondary"}`} onClick={() => setLang("en")}>English</button><button className={`btn btn-sm ${lang === "es" ? "btn-primary" : "btn-outline-secondary"}`} onClick={() => setLang("es")}>Español</button><button className={`btn btn-sm ${lang === "both" ? "btn-primary" : "btn-outline-secondary"}`} onClick={() => setLang("both")}>Both (EN + ES)</button><span className="small text-muted">Spanish uses a template dictionary in demo mode (English always shown alongside); live mode translates with OpenAI.</span></div>
    {feedback.map((f, i) => (<div key={i} className="card mb-3"><div className="card-body"><h5>Feedback: {f.studentName} ({f.total} / {f.maxTotal})</h5>
      {(lang === "en" || lang === "both") && <p className="mb-1"><strong>EN:</strong> {f.overallEn}</p>}
      {(lang === "es" || lang === "both") && <p className="mb-2"><strong>ES:</strong> {f.overallEs}</p>}
      {f.rows.map((r) => (<p key={r.no} className="mb-1 small"><strong>Q{r.no}:</strong> {r.mark}/{r.max}, {(lang === "es" ? r.es : lang === "both" ? `${r.en} / ${r.es}` : r.en)}{r.reason ? ` (${r.reason})` : ""}</p>))}
    </div></div>))}
    {papers.length === 0 && <p className="text-muted">No graded papers yet for this test.</p>}
  </div>);
}
