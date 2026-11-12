import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";
import { currentUser } from "@/lib/session";
// GET CSV for one test: one row per approved/graded paper. Paste straight into
// Google Classroom / Canvas / a school gradebook, no LMS integration needed.
export async function GET(req, { params }) {
  const { user, db } = await currentUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const test = db.tests.find((t) => t.id === params.id && t.userId === user.id);
  if (!test) return NextResponse.json({ error: "Test not found" }, { status: 404 });
  const papers = db.papers.filter((p) => p.testId === test.id && p.grading);
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [["Student", "Student ID", "Total", `Out of ${test.totalMarks}`, "Status"].map(esc).join(",")];
  papers.forEach((p) => lines.push([p.studentName, p.studentId, p.grading.total, test.totalMarks, p.status].map(esc).join(",")));
  return new NextResponse(lines.join("\n"), { headers: { "Content-Type": "text/csv", "Content-Disposition": `attachment; filename="${test.subject.replace(/[^a-z0-9]+/gi, "-")}-results.csv"` } });
}
