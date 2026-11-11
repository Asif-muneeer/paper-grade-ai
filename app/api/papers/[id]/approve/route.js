import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";
import { currentUser } from "@/lib/session";
// POST { rows? }: teacher approves the draft. Optional edited rows (mark /
// recognised answer per question) are applied and the total recomputed.
// This is the ONLY way a paper becomes "approved" (a result).
export async function POST(req, { params }) {
  const { user, db } = currentUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const paper = db.papers.find((p) => p.id === params.id && p.userId === user.id);
  if (!paper || !paper.grading) return NextResponse.json({ error: "Paper has no draft grade to approve yet." }, { status: 400 });
  let body = {};
  try { body = await req.json(); } catch { body = {}; }
  if (Array.isArray(body.rows)) {
    body.rows.forEach((r) => {
      const row = paper.grading.rows.find((x) => x.questionId === r.questionId);
      if (row) { if (r.mark !== undefined) row.mark = Math.max(0, Math.min(row.max, Number(r.mark) || 0)); if (r.recognised !== undefined) row.recognised = r.recognised; }
    });
    paper.grading.total = paper.grading.rows.reduce((s, r) => s + r.mark, 0);
  }
  paper.status = "approved"; paper.approvedAt = new Date().toISOString();
  writeDB(db);
  return NextResponse.json({ ok: true, paper });
}
