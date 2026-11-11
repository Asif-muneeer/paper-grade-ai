"use client";
import { useEffect, useState } from "react";
export default function Billing() {
  const [d, setD] = useState(null); const [msg, setMsg] = useState("");
  const load = () => fetch("/api/stats").then((r) => r.json()).then(setD);
  useEffect(load, []);
  async function upgrade() { const r = await fetch("/api/billing/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan: "teacher" }) }); const j = await r.json(); setMsg(j.note || j.error || "Upgraded."); load(); }
  if (!d) return <div className="py-5">Loading…</div>;
  return (<div><h2>Billing</h2><p>Current plan: <strong>{d.plan.name}</strong> — {d.usedThisMonth} / {d.plan.papersPerMonth} papers this month.</p>{msg && <div className="alert alert-info">{msg}</div>}
    <div className="row g-3">
      <div className="col-md-6"><div className="card p-4 h-100"><h4>Free — $0</h4><p>30 papers / month · 1 class · CSV export.</p><p className="text-muted">Your current plan {d.user.plan === "free" ? "(active)" : ""}.</p></div></div>
      <div className="col-md-6"><div className="card p-4 h-100 border-primary"><h4>Teacher — $15/mo billed annually ($19 monthly)</h4><p>800 papers / month · unlimited classes · feedback PDFs · priority processing.</p>{d.user.plan === "teacher" ? <p className="text-success fw-bold">Active — demo checkout, no card was charged.</p> : <button className="btn btn-primary" onClick={upgrade}>Upgrade (demo checkout)</button>}<p className="small text-muted mt-2">Real payments: Lemon Squeezy or Paddle as merchant of record — they handle US sales tax for a Pakistan-based seller. Stripe direct only if eligible.</p></div></div>
    </div></div>);
}
