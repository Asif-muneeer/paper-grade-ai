// lib/db.js: data store. Supabase (Postgres) when env vars are set, otherwise
// the original JSON file store with in-memory fallback (local dev + the
// current live site, which has no env vars set yet).
//
// Supabase mode is ASYNC: readDB()/writeDB() return Promises, so every caller
// awaits them. JSON mode is still synchronous under the hood but wrapped in
// the same async API so callers do not care which store is active.
// FERPA minimisation: papers store student first name / student ID only, never
// email, date of birth, or photos of students.
import fs from "fs";
import path from "path";
import { seedData } from "./seed.js";
import { supabaseConfigured, sbSelectAll, sbUpsert, sbDeleteIds, sbUploadFile } from "./supabase.js";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");
export const UPLOAD_DIR = process.env.VERCEL ? "/tmp/uploads" : path.join(DATA_DIR, "uploads");
export const STORAGE_BUCKET = "papers";

// ---------- JSON fallback (unchanged behaviour) ----------
let memoryDB = null;
function readJSON() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
      const data = seedData();
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
      memoryDB = data;
      return data;
    }
    const data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    memoryDB = data;
    return data;
  } catch (e) {
    if (!memoryDB) memoryDB = seedData();
    return memoryDB;
  }
}
function writeJSON(data) {
  memoryDB = data;
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    // read-only filesystem (Vercel): keep the in-memory copy only
  }
}

// ---------- Supabase row <-> JSON mapping ----------
const toUser = (r) => ({ id: r.id, name: r.name, email: r.email, salt: r.salt, passwordHash: r.password_hash, plan: r.plan, createdAt: r.created_at });
const fromUser = (u) => ({ id: u.id, name: u.name, email: u.email, salt: u.salt, password_hash: u.passwordHash, plan: u.plan, created_at: u.createdAt });
const toTest = (r) => ({ id: r.id, userId: r.user_id, subject: r.subject, className: r.class_name, rubricLibraryId: r.rubric_library_id || "", totalMarks: r.total_marks, questions: r.questions || [], createdAt: r.created_at });
const fromTest = (t) => ({ id: t.id, user_id: t.userId, subject: t.subject, class_name: t.className || "", rubric_library_id: t.rubricLibraryId || "", total_marks: t.totalMarks, questions: t.questions || [], created_at: t.createdAt });
const toPaper = (r) => ({ id: r.id, testId: r.test_id, userId: r.user_id, studentName: r.student_name, studentId: r.student_id || "", fileName: r.file_name || "", fileType: r.file_type || "", filePath: r.file_path || "", answers: r.answers || [], status: r.status, grading: r.grading || null, mode: r.mode || undefined, splitInfo: r.split_info || undefined, approvedAt: r.approved_at || undefined, createdAt: r.created_at });
const fromPaper = (p) => ({ id: p.id, test_id: p.testId, user_id: p.userId, student_name: p.studentName, student_id: p.studentId || "", file_name: p.fileName || "", file_type: p.fileType || "", file_path: p.filePath || "", answers: p.answers || [], status: p.status, grading: p.grading || null, mode: p.mode || null, split_info: p.splitInfo || null, approved_at: p.approvedAt || null, created_at: p.createdAt });

async function readSupabase() {
  const [users, tests, papers] = await Promise.all([sbSelectAll("users"), sbSelectAll("tests"), sbSelectAll("papers")]);
  const db = { users: users.map(toUser), tests: tests.map(toTest), papers: papers.map(toPaper) };
  if (!db.users.length) {
    // First run against empty tables: seed the demo teacher/test/papers so
    // the demo login keeps working exactly as it does on the JSON store.
    const seed = seedData();
    await Promise.all([
      sbUpsert("users", seed.users.map(fromUser)),
      sbUpsert("tests", seed.tests.map(fromTest)),
      sbUpsert("papers", seed.papers.map(fromPaper)),
    ]);
    return seed;
  }
  return db;
}

async function writeSupabase(data) {
  // Upsert everything, then delete rows the caller removed (e.g. test delete
  // filters db.tests/db.papers and then calls writeDB).
  const [existingUsers, existingTests, existingPapers] = await Promise.all([sbSelectAll("users"), sbSelectAll("tests"), sbSelectAll("papers")]);
  const missing = (existing, next) => existing.map((r) => r.id).filter((id) => !next.some((n) => n.id === id));
  await Promise.all([
    sbUpsert("users", data.users.map(fromUser)),
    sbUpsert("tests", data.tests.map(fromTest)),
    sbUpsert("papers", data.papers.map(fromPaper)),
  ]);
  await Promise.all([
    sbDeleteIds("users", missing(existingUsers, data.users)),
    sbDeleteIds("tests", missing(existingTests, data.tests)),
    sbDeleteIds("papers", missing(existingPapers, data.papers)),
  ]);
}

// ---------- Public API (async in both modes) ----------
export async function readDB() {
  if (supabaseConfigured()) {
    try {
      return await readSupabase();
    } catch (e) {
      console.error("[db] Supabase read failed, falling back to JSON store:", e.message);
      return readJSON();
    }
  }
  return readJSON();
}

export async function writeDB(data) {
  if (supabaseConfigured()) {
    try {
      await writeSupabase(data);
      return;
    } catch (e) {
      console.error("[db] Supabase write failed, falling back to JSON store:", e.message);
    }
  }
  writeJSON(data);
}

// Store an uploaded paper file: Supabase Storage bucket "papers" when
// configured (filePath "storage:papers/<name>"), local disk otherwise.
// Returns the filePath value to store on the paper record.
export async function storeUploadFile(safeName, buffer, contentType) {
  if (supabaseConfigured()) {
    const storagePath = await sbUploadFile(STORAGE_BUCKET, safeName, buffer, contentType);
    return `storage:${STORAGE_BUCKET}/${storagePath}`;
  }
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const filePath = path.join(UPLOAD_DIR, safeName);
  fs.writeFileSync(filePath, buffer);
  return filePath;
}

export function papersThisMonth(db, userId) {
  const now = new Date();
  const ym = `${now.getFullYear()}-${now.getMonth()}`;
  return db.papers.filter((p) => {
    if (p.userId !== userId) return false;
    const d = new Date(p.createdAt);
    return `${d.getFullYear()}-${d.getMonth()}` === ym;
  }).length;
}
