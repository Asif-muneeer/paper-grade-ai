import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";
import { currentUser } from "@/lib/session";
import { gradePaperWithAI, aiMode } from "@/lib/ai";
// POST { answers? }: re-grades a paper (teacher may correct transcribed answers
// first). Returns draft grading + mode (demo/live). Never final: status stays
// "graded" until the teacher approves it in the review grid.
export async function POST(req, { params }) {
  const { user, db } = currentUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const paper = db.papers.find((p) => p.id === params.id && p.userId === user.id);
  if (!paper) return NextResponse.json({ error: "Paper not found" }, { status: 404 });
  const test = db.tests.find((t) => t.id === paper.testId);
  if (!test) return NextResponse.json({ error: "Test not found" }, { status: 404 });
  let body = {};
  try { body = await req.json(); } catch { body = {}; }
  if (Array.isArray(body.answers)) paper.answers = body.answers;
  const { grading, mode } = await gradePaperWithAI(test, paper);
  paper.grading = grading; paper.status = "graded"; paper.mode = mode;
  writeDB(db);
  return NextResponse.json({ ok: true, grading, mode, aiMode: aiMode() });
}
