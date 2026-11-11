import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";
import { verifyPassword, createSession } from "@/lib/auth";
export async function POST(req) {
  const { email, password } = await req.json();
  const db = readDB();
  const user = db.users.find((u) => u.email.toLowerCase() === String(email || "").toLowerCase());
  if (!user || !verifyPassword(password, user.salt, user.passwordHash)) return NextResponse.json({ error: "Wrong email or password." }, { status: 401 });
  createSession(user.id);
  return NextResponse.json({ ok: true });
}
