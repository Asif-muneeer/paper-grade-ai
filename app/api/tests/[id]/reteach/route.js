import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";
import { currentUser } from "@/lib/session";
import { computeAnalytics } from "@/lib/analytics";
import { generateReteach } from "@/lib/reteach";
import { reteachItemsLive, aiMode } from "@/lib/ai";
// GET /api/tests/[id]/reteach: Reteach worksheet from the 3 most-missed
// questions. Demo: deterministic templates (lib/reteach.js). Live: OpenAI
// generates similar practice items, falling back to templates on error.
export async function GET(req, { params }) {
  const { user, db } = currentUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const test = db.tests.find((t) => t.id === params.id && t.userId === user.id);
  if (!test) return NextResponse.json({ error: "Test not found" }, { status: 404 });
  const papers = db.papers.filter((p) => p.testId === test.id && p.userId === user.id);
  const analytics = computeAnalytics(test, papers);
  const worksheet = generateReteach(test, analytics);
  let mode = "demo";
  if (aiMode() === "live" && analytics.mostMissed.length) {
    const live = await reteachItemsLive(analytics.mostMissed);
    if (live) {
      mode = "live";
      worksheet.sections = worksheet.sections.map((s) => {
        const l = live.find((x) => Number(x.questionNo) === s.questionNo);
        return l && Array.isArray(l.items) && l.items.length ? { ...s, items: l.items.map((it, i) => ({ no: i + 1, text: it.text, answer: it.answer || "" })) } : s;
      });
    }
  }
  return NextResponse.json({ ok: true, worksheet, analytics, mode, aiMode: aiMode() });
}
