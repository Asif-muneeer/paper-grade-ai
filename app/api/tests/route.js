import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";
import { currentUser } from "@/lib/session";
export async function GET() {
  const { user, db } = await currentUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  return NextResponse.json({ tests: db.tests.filter((t) => t.userId === user.id) });
}
export async function POST(req) {
  const { user, db } = await currentUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const body = await req.json();
  if (!body.subject || !Array.isArray(body.questions) || !body.questions.length) return NextResponse.json({ error: "Subject and at least one question are required." }, { status: 400 });
  const questions = body.questions.map((q, i) => ({ id: q.id || `q_${Date.now()}_${i}`, no: i + 1, type: q.type || "mcq", topic: q.topic || "", text: q.text || "", marks: Number(q.marks || 1), correctAnswer: q.correctAnswer || "", modelAnswer: q.modelAnswer || "", rubric: q.rubric || "", finalMarks: Number(q.finalMarks ?? 1), steps: Array.isArray(q.steps) ? q.steps.map((s) => ({ label: s.label || "Step", marks: Number(s.marks || 0), keywords: s.keywords || s.model || "" })) : [] }));
  const test = { id: `t_${Date.now()}`, userId: user.id, subject: body.subject, className: body.className || "", rubricLibraryId: body.rubricLibraryId || "", totalMarks: questions.reduce((s, q) => s + q.marks, 0), questions, createdAt: new Date().toISOString() };
  db.tests.push(test); await writeDB(db);
  return NextResponse.json({ ok: true, test });
}
