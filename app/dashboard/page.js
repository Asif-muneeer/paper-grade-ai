"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Dashboard() {
  const [d, setD] = useState(null);
  useEffect(() => { fetch("/api/stats").then((r) => r.ok ? r.json() : null).then(setD); }, []);
  if (!d) return <div className="container py-5">Loading…</div>;
  const s = d.stats;
  return (<div>
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2"><h2>Welcome, {d.user.name}</h2><span className="badge bg-secondary">Grading mode: {d.aiMode === "live" ? "LIVE (OpenAI)" : "DEMO (built-in rules)"}</span></div>
    <p className="text-muted">Plan: <strong>{d.plan.name}</strong> — {d.usedThisMonth} / {d.plan.papersPerMonth} papers this month.</p>
    <div className="row g-3">
      <div className="col-6 col-md-3"><div className="card p-3 text-center"><h3>{s.tests}</h3><p className="mb-0">Tests</p></div></div>
      <div className="col-6 col-md-3"><div className="card p-3 text-center"><h3>{s.papers}</h3><p className="mb-0">Papers uploaded</p></div></div>
      <div className="col-6 col-md-3"><div className="card p-3 text-center"><h3>{s.pending}</h3><p className="mb-0">Waiting for approval</p></div></div>
      <div className="col-6 col-md-3"><div className="card p-3 text-center"><h3>~{s.hoursSaved} hrs</h3><p className="mb-0">Est. time saved</p></div></div>
    </div>
    <div className="d-flex flex-wrap gap-2 mt-4"><Link className="btn btn-primary" href="/dashboard/tests">Create a test</Link><Link className="btn btn-outline-primary" href="/dashboard/billing">Upgrade to Teacher — $15/mo</Link></div>
    <h4 className="mt-4">Your tests</h4>
    {d.tests.length === 0 ? <p className="text-muted">No tests yet — create one to start grading.</p> : <div className="list-group">{d.tests.map((t) => <Link key={t.id} className="list-group-item list-group-item-action" href={`/dashboard/tests/${t.id}`}>{t.subject} — {t.className} · {t.questions.length} questions · {t.totalMarks} marks</Link>)}</div>}
    <h4 className="mt-4">Recent papers</h4>
    <div className="table-responsive"><table className="table table-bordered bg-white"><thead><tr><th>Student</th><th>Score</th><th>Status</th><th></th></tr></thead><tbody>{d.papers.slice(-8).reverse().map((p) => <tr key={p.id}><td>{p.studentName}</td><td>{p.grading ? `${p.grading.total} / ${p.grading.maxTotal}` : "—"}</td><td>{p.status}{p.grading && p.grading.rows.some((r) => r.confidence === "Low") ? " · ⚠️ low-confidence read" : ""}</td><td><a href={`/dashboard/tests/${p.testId}`}>Review</a></td></tr>)}</tbody></table></div>
  </div>);
}
