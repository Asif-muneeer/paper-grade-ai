"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { computeAnalytics } from "@/lib/analytics";
// Analytics + Reteach Report page. Computes everything client-side from the
// existing /api/tests/[id] payload (test + graded papers) — no new data
// needed. Reteach worksheet comes from /api/tests/[id]/reteach (demo
// templates, or live OpenAI items when a key is set).
export default function Analytics({ params }) {
  const [data, setData] = useState(null);
  const [ws, setWs] = useState(null);
  const [msg, setMsg] = useState("");
  useEffect(() => { fetch(`/api/tests/${params.id}`).then((r) => r.json()).then(setData); }, []);
  if (!data?.test) return <div className="py-5">Loading…</div>;
  const test = data.test, papers = data.papers || [];
  const a = computeAnalytics(test, papers);
  async function loadReteach() {
    setMsg("Generating reteach worksheet…");
    const r = await fetch(`/api/tests/${params.id}/reteach`); const d = await r.json();
    if (!r.ok) return setMsg(d.error);
    setWs(d.worksheet); setMsg(`Reteach worksheet ready (${d.mode === "live" ? "LIVE" : "DEMO templates"}). Print it below.`);
  }
  const badge = (level) => level === "Mastered" ? "bg-success" : level === "Developing" ? "bg-warning text-dark" : "bg-danger";
  return (<div>
    <div className="d-flex flex-wrap justify-content-between gap-2 no-print"><h2>Class Analytics — {test.subject} ({test.className})</h2><div className="d-flex gap-2"><Link className="btn btn-outline-secondary" href={`/dashboard/tests/${test.id}`}>Back to test</Link><Link className="btn btn-outline-secondary" href={`/dashboard/results/${test.id}`}>Mark sheet</Link></div></div>
    {msg && <div className="alert alert-info no-print">{msg}</div>}
    {a.papersCount === 0 && <p className="text-muted">No graded papers yet — grade at least one paper, then analytics will appear here.</p>}
    {a.papersCount > 0 && (<>
      <div className="row g-3 mb-4 text-center"><div className="col-md-4"><div className="card p-3"><h3>{a.classAvg}%</h3><p className="mb-0">Class average</p></div></div><div className="col-md-4"><div className="card p-3"><h3>{a.papersCount}</h3><p className="mb-0">Graded papers</p></div></div><div className="col-md-4"><div className="card p-3"><h3>{a.mastery.filter((m) => m.level === "Needs support").length}</h3><p className="mb-0">Students needing support</p></div></div></div>
      <h4>Most-missed questions</h4>
      <div className="table-responsive"><table className="table table-bordered bg-white"><thead><tr><th>Q</th><th>Topic</th><th>Class average</th><th>Full marks</th></tr></thead><tbody>
        {a.mostMissed.map((q) => <tr key={q.questionId}><td>Q{q.no} — {q.text}</td><td>{q.topic}</td><td><strong>{q.avgPct}%</strong></td><td>{q.fullMarks} / {q.attempted}</td></tr>)}
      </tbody></table></div>
      <h4>Weakest topics</h4>
      <div className="table-responsive"><table className="table table-bordered bg-white"><thead><tr><th>Topic</th><th>Questions</th><th>Class average</th></tr></thead><tbody>
        {a.topics.map((t) => <tr key={t.topic}><td>{t.topic}</td><td>{t.questions}</td><td><strong>{t.avgPct}%</strong></td></tr>)}
      </tbody></table></div>
      <h4>Mastery per student</h4>
      <div className="table-responsive"><table className="table table-bordered bg-white"><thead><tr><th>Student</th><th>Score</th><th>Level</th></tr></thead><tbody>
        {a.mastery.map((m, i) => <tr key={i}><td>{m.studentName}{m.studentId ? ` (${m.studentId})` : ""}</td><td>{m.total} / {m.max} ({m.pct}%)</td><td><span className={`badge ${badge(m.level)}`}>{m.level}</span></td></tr>)}
      </tbody></table></div>
      <h4>Reteach Report</h4>
      <p>What to teach again, based on the 3 most-missed questions — and a printable practice worksheet for exactly those topics. Competitors only give marks; this tells you what to reteach.</p>
      <div className="no-print mb-3"><button className="btn btn-primary" onClick={loadReteach}>Generate reteach worksheet</button></div>
      {ws && (<div className="card p-3 mb-3"><h5>Reteach worksheet — {ws.testSubject} ({ws.className})</h5><p className="small text-muted">Focus: {ws.focus.join(" · ")}</p>
        {ws.sections.map((s, i) => (<div key={i} className="mb-3"><strong>From Q{s.questionNo} — {s.topic} (class average {s.avgPct}%)</strong>{s.items.map((it) => (<p key={it.no} className="mb-1 small"><strong>{it.no}.</strong> {it.text}</p>))}</div>))}
        <hr /><h6>Answer key (page 2 — do not hand this page to students)</h6>{ws.sections.map((s, i) => (<div key={i}>{s.items.map((it) => (<p key={it.no} className="mb-1 small"><strong>Q{s.questionNo}.{it.no}:</strong> {it.answer}</p>))}</div>))}
        <p className="small text-muted mt-2">{ws.note}</p>
        <div className="no-print"><button className="btn btn-outline-secondary" onClick={() => window.print()}>Print worksheet</button></div>
      </div>)}
    </>)}
  </div>);
}
