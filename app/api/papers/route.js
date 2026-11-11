import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { readDB, writeDB, papersThisMonth, UPLOAD_DIR } from "@/lib/db";
import { currentUser } from "@/lib/session";
import { PLANS } from "@/lib/billing";
// POST multipart: testId, studentName, studentId, answers (JSON), file (image/PDF, optional).
// The file is stored under data/uploads; answers are the teacher-transcribed
// answers (fallback path that works fully offline in demo mode).
// SPLIT MODE (V2): mode=split + ONE class PDF + names (one per line) +
// optional pageRanges ("Ava: 1-2" per line). No real PDF parser is used —
// the tool creates one paper per student in list order and stores the page
// mapping visibly (splitInfo) so the teacher can reassign in review.
function parseRanges(text, names) {
  const map = {};
  String(text || "").split(/\r?\n/).forEach((line) => {
    const m = line.match(/^(.+?):\s*(\d+)\s*-\s*(\d+)\s*$/);
    if (m) map[m[1].trim().toLowerCase()] = { from: Number(m[2]), to: Number(m[3]) };
    const m2 = line.match(/^(.+?):\s*(\d+)\s*$/);
    if (m2 && !map[m2[1].trim().toLowerCase()]) map[m2[1].trim().toLowerCase()] = { from: Number(m2[2]), to: Number(m2[2]) };
  });
  return names.map((n, i) => map[n.toLowerCase()] || { from: i + 1, to: i + 1 });
}
export async function POST(req) {
  const { user, db } = currentUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const plan = PLANS[user.plan] || PLANS.free;
  if (papersThisMonth(db, user.id) >= plan.papersPerMonth) return NextResponse.json({ error: `Monthly limit reached (${plan.papersPerMonth} papers on the ${plan.name} plan). Upgrade to keep grading.` }, { status: 402 });
  const form = await req.formData();
  const testId = form.get("testId");
  const test = db.tests.find((t) => t.id === testId && t.userId === user.id);
  if (!test) return NextResponse.json({ error: "Test not found" }, { status: 404 });
  if (String(form.get("mode") || "") === "split") {
    const names = String(form.get("names") || "").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    if (!names.length) return NextResponse.json({ error: "Paste at least one student name, one per line." }, { status: 400 });
    if (papersThisMonth(db, user.id) + names.length > plan.papersPerMonth) return NextResponse.json({ error: `This split would exceed your monthly limit (${plan.papersPerMonth} papers on the ${plan.name} plan).` }, { status: 402 });
    const file = form.get("file");
    if (!file || typeof file !== "object" || file.size === 0 || file.type !== "application/pdf") return NextResponse.json({ error: "Split mode needs ONE class PDF file." }, { status: 400 });
    if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    const safe = `${Date.now()}_${String(file.name).replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const filePath = path.join(UPLOAD_DIR, safe);
    fs.writeFileSync(filePath, Buffer.from(await file.arrayBuffer()));
    const ranges = parseRanges(form.get("pageRanges"), names);
    const papers = names.map((name, i) => {
      const paper = { id: `p_${Date.now()}_${i}`, testId, userId: user.id, studentName: name, studentId: "", fileName: file.name, fileType: "application/pdf", filePath, answers: [], status: "uploaded", grading: null, splitInfo: { sourceFile: file.name, pages: ranges[i], position: i + 1, of: names.length, note: "Page order = name-list order. Reassign in review if a page belongs to another student." }, createdAt: new Date().toISOString() };
      db.papers.push(paper); return paper;
    });
    writeDB(db);
    return NextResponse.json({ ok: true, papers, split: true, note: "One paper created per name, in list order. Page ranges are stored on each paper — no PDF pages were cut apart." });
  }
  const studentName = String(form.get("studentName") || "").trim();
  if (!studentName) return NextResponse.json({ error: "Student name (or ID) is required." }, { status: 400 });
  let answers = [];
  try { answers = JSON.parse(String(form.get("answers") || "[]")); } catch { answers = []; }
  const file = form.get("file");
  let fileName = "", fileType = "", filePath = "";
  if (file && typeof file === "object" && file.size > 0) {
    if (!["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.type)) return NextResponse.json({ error: "Only JPG/PNG/WebP images or PDF files." }, { status: 400 });
    if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    const safe = `${Date.now()}_${String(file.name).replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    filePath = path.join(UPLOAD_DIR, safe);
    fs.writeFileSync(filePath, Buffer.from(await file.arrayBuffer()));
    fileName = file.name; fileType = file.type;
  }
  const paper = { id: `p_${Date.now()}`, testId, userId: user.id, studentName, studentId: String(form.get("studentId") || ""), fileName, fileType, filePath, answers, status: "uploaded", grading: null, createdAt: new Date().toISOString() };
  db.papers.push(paper); writeDB(db);
  return NextResponse.json({ ok: true, paper });
}
