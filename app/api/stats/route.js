import { NextResponse } from "next/server";
import { readDB, papersThisMonth } from "@/lib/db";
import { currentUser } from "@/lib/session";
import { planFor } from "@/lib/billing";
import { aiMode as aiGradingMode } from "@/lib/ai";
export async function GET() {
  const { user, db } = await currentUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const tests = db.tests.filter((t) => t.userId === user.id);
  const papers = db.papers.filter((p) => p.userId === user.id);
  const graded = papers.filter((p) => p.grading);
  const pending = papers.filter((p) => p.status === "graded").length;
  const totalMarks = graded.reduce((s, p) => s + (p.grading?.total || 0), 0);
  return NextResponse.json({ user: { name: user.name, email: user.email, plan: user.plan }, plan: planFor(user), usedThisMonth: papersThisMonth(db, user.id), tests, papers, stats: { tests: tests.length, papers: papers.length, graded: graded.length, pending, avgScore: graded.length ? Math.round((totalMarks / graded.length) * 10) / 10 : 0, hoursSaved: Math.round(graded.length * 0.12 * 10) / 10 }, aiMode: aiGradingMode() });
}
