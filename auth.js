// lib/auth.js — scrypt password hashing + HMAC-signed cookie sessions (Node crypto only).
import crypto from "crypto";
import { cookies } from "next/headers";
const SECRET = process.env.SESSION_SECRET || "dev-secret-change-me";
const COOKIE = "paperchecker_session";
const MAX_AGE = 60 * 60 * 24 * 14;
export function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { salt, hash };
}
export function verifyPassword(password, salt, expectedHash) {
  const a = crypto.scryptSync(password, salt, 64);
  const b = Buffer.from(expectedHash, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
function sign(payload) { return crypto.createHmac("sha256", SECRET).update(payload).digest("hex"); }
export function createSession(userId) {
  const expires = Date.now() + MAX_AGE * 1000;
  const payload = `${userId}.${expires}`;
  cookies().set(COOKIE, `${payload}.${sign(payload)}`, { httpOnly: true, sameSite: "lax", path: "/", maxAge: MAX_AGE, secure: process.env.NODE_ENV === "production" });
}
export function getSession() {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [userId, expires, sig] = parts;
  if (sign(`${userId}.${expires}`) !== sig) return null;
  if (Date.now() > Number(expires)) return null;
  return { userId };
}
export function destroySession() { cookies().set(COOKIE, "", { path: "/", maxAge: 0 }); }
