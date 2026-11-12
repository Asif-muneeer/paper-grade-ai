import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";
import { currentUser } from "@/lib/session";
import { feedbackForPaper, translateLine } from "@/lib/feedback";
import { translateFeedback, aiMode } from "@/lib/ai";
// GET /api/tests/[id]/feedback: per-student feedback EN + ES.
// Demo: template dictionary (English always shown alongside Spanish).
// Live: OpenAI translates each line, falling back to templates on error.
export async function GET(req, { params }) {
  const { user, db } = await currentUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const test = db.tests.find((t) => t.id === params.id && t.userId === user.id);
  if (!test) return NextResponse.json({ error: "Test not found" }, { status: 404 });
  const papers = db.papers.filter((p) => p.testId === test.id && p.userId === user.id && p.grading);
  const live = aiMode() === "live";
  const out = [];
  for (const p of papers) {
    const f = feedbackForPaper(p, test);
    if (live) {
      const esOverall = await translateFeedback(f.overallEn);
      if (esOverall) f.overallEs = esOverall;
      for (const r of f.rows) {
        const es = await translateFeedback(r.en);
        if (es) r.es = es;
      }
    }
    out.push(f);
  }
  return NextResponse.json({ ok: true, feedback: out, mode: live ? "live" : "demo", aiMode: aiMode() });
}
