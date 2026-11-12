// lib/session.js: one helper: who is logged in? (async: the store is async
// when Supabase is configured, sync JSON otherwise — same awaited API.)
import { readDB } from "./db.js";
import { getSession } from "./auth.js";
export async function currentUser() {
  const session = getSession();
  if (!session) return { user: null, db: null };
  const db = await readDB();
  const user = db.users.find((u) => u.id === session.userId) || null;
  return { user, db };
}
