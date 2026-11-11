"use client";
import { useState } from "react";
import Link from "next/link";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  async function submit(e) { e.preventDefault(); setErr(""); const r = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); if (r.ok) location.href = "/dashboard"; else setErr((await r.json()).error || "Login failed"); }
  return (<div className="container py-5" style={{ maxWidth: 480 }}><h2>Log in</h2><p className="text-muted">Demo: demo@teacherpaper.com / demo1234</p>{err && <div className="alert alert-danger">{err}</div>}<form onSubmit={submit} className="card p-4 d-grid gap-3"><input className="form-control" placeholder="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><input className="form-control" placeholder="Password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /><button className="btn btn-primary">Log in</button></form><p className="mt-3">No account? <Link href="/signup">Sign up free</Link></p></div>);
}
