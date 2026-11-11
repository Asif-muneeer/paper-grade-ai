// lib/db.js — JSON file store. THE ONE file to swap for Supabase/Postgres later.
// All data lives in data/db.json; every read/write goes through readDB/writeDB.
// FERPA minimisation: papers store student first name / student ID only — never
// email, date of birth, or photos of students.
import fs from "fs";
import path from "path";
import { seedData } from "./seed.js";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

export function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    const data = seedData();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return data;
  }
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}
export function writeDB(data) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
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
