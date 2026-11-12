import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";
import { hashPassword, createSession } from "@/lib/auth";
export async function POST(req) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password || password.length < 6) return NextResponse.json({ error: "Name, email and a 6+ character password are required." }, { status: 400 });
  const db = await readDB();
  if (db.users.find((u) => u.email.toLowerCase() === email.toLowerCase())) return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
  const { salt, hash } = hashPassword(password);
  const user = { id: `u_${Date.now()}`, name, email, salt, passwordHash: hash, plan: "free", createdAt: new Date().toISOString() };
  db.users.push(user); await writeDB(db); createSession(user.id);
  return NextResponse.json({ ok: true });
}
