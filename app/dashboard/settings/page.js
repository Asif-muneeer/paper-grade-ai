"use client";
import { useEffect, useState } from "react";
export default function Settings() {
  const [d, setD] = useState(null);
  useEffect(() => { fetch("/api/stats").then((r) => r.json()).then(setD); }, []);
  async function delTest(id) { if (!confirm("Delete this test and all its papers? This cannot be undone.")) return; await fetch(`/api/tests/${id}`, { method: "DELETE" }); location.reload(); }
  if (!d) return <div className="py-5">Loading…</div>;
  return (<div><h2>Settings</h2>
    <div className="card p-4 mb-3"><h5>Account</h5><p className="mb-1">{d.user.name} — {d.user.email}</p><p className="mb-0 text-muted">Plan: {d.plan.name}</p></div>
    <div className="card p-4 mb-3"><h5>AI mode</h5><p className="mb-1">Grading mode: <strong>{d.aiMode === "live" ? "LIVE (OpenAI Vision API)" : "DEMO (built-in rules — no OpenAI key set)"}</strong></p><p className="text-muted mb-0">To go live, set OPENAI_API_KEY in your environment (Vercel → Settings → Environment Variables) and redeploy. The live call sends only the paper image + key/rubric for that one job — never to train a model.</p></div>
    <div className="card p-4 mb-3"><h5>Privacy &amp; data retention (FERPA)</h5><ul className="mb-0"><li>Student name / ID only — no email, no date of birth.</li><li>No training on student data. DPA available on request.</li><li>Delete a whole class set in one click below — files and grades go with it.</li><li>Free plan: paper images auto-delete after 90 days. Paid: kept for the school year.</li></ul></div>
    <h5>Delete a test + all its papers</h5>
    {d.tests.map((t) => (<div key={t.id} className="d-flex justify-content-between border rounded p-2 mb-2"><span>{t.subject} — {t.className}</span><button className="btn btn-sm btn-outline-danger" onClick={() => delTest(t.id)}>Delete all</button></div>))}
  </div>);
}
