"use client";
import { useState } from "react";
import Link from "next/link";
export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  async function submit(e) { e.preventDefault(); setErr(""); const r = await fetch("/api/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); if (r.ok) location.href = "/dashboard"; else setErr((await r.json()).error || "Signup failed"); }
  return (<div className="container py-5" style={{ maxWidth: 480 }}><h2>Create your free account</h2><p className="text-muted">30 papers a month free. No card required.</p>{err && <div className="alert alert-danger">{err}</div>}<form onSubmit={submit} className="card p-4 d-grid gap-3"><input className="form-control" placeholder="Your name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><input className="form-control" placeholder="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><input className="form-control" placeholder="Password (min 6 characters)" type="password" required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /><button className="btn btn-primary">Create account</button></form><p className="mt-3">Already have an account? <Link href="/login">Log in</Link></p></div>);
}
