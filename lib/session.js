// lib/session.js: one helper: who is logged in?
import { readDB } from "./db.js";
import { getSession } from "./auth.js";
export function currentUser() {
  const session = getSession();
  if (!session) return { user: null, db: null };
  const db = readDB();
  const user = db.users.find((u) => u.id === session.userId) || null;
  return { user, db };
}
