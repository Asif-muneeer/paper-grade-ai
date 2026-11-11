// lib/db.js — JSON file store. THE ONE file to swap for Supabase/Postgres later.
// All data lives in data/db.json; every read/write goes through readDB/writeDB.
// FERPA minimisation: papers store student first name / student ID only — never
// email, date of birth, or photos of students.
import fs from "fs";
import path from "path";
import { seedData } from "./seed.js";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");
export const UPLOAD_DIR = process.env.VERCEL ? "/tmp/uploads" : path.join(DATA_DIR, "uploads");

// Vercel serverless filesystem is read-only: file writes throw. Fall back to
// an in-memory copy so the demo still works live (data resets between
// invocations). Before the first paying teacher, swap this file for Supabase.
let memoryDB = null;
export function readDB() {
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
export function writeDB(data) {
  memoryDB = data;
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    // read-only filesystem (Vercel): keep the in-memory copy only
  }
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
