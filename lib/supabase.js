// lib/supabase.js: minimal Supabase client using plain fetch (no new dependency).
// Talks to PostgREST + Storage over HTTPS. Server-side only: lib/db.js and the
// API routes import this; no page component does, so the key never ships to
// the browser. The URL and anon key come ONLY from env vars — never hardcoded.
//
// Env vars (either pair works; the server-only pair is preferred):
//   SUPABASE_URL / SUPABASE_ANON_KEY        (recommended, never exposed)
//   NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY  (also accepted)
// NEVER use the service_role / sb_secret_ key here or anywhere in this repo.

const URL = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, "");
const KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export function supabaseConfigured() {
  return Boolean(URL && KEY);
}

function headers(extra = {}) {
  return { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json", ...extra };
}

async function sbFetch(path, options = {}) {
  const res = await fetch(`${URL}${path}`, { ...options, headers: headers(options.headers) });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Supabase ${res.status} ${options.method || "GET"} ${path}: ${text.slice(0, 200)}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// ---- PostgREST table helpers ----
export async function sbSelectAll(table, order = "created_at.asc") {
  return (await sbFetch(`/rest/v1/${table}?select=*&order=${order}`)) || [];
}

export async function sbUpsert(table, rows) {
  if (!rows.length) return [];
  return (await sbFetch(`/rest/v1/${table}`, {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(rows),
  })) || [];
}

export async function sbDeleteIds(table, ids) {
  if (!ids.length) return;
  // PostgREST: id=in.(a,b,c)
  await sbFetch(`/rest/v1/${table}?id=in.(${ids.map((id) => encodeURIComponent(String(id))).join(",")})`, { method: "DELETE" });
}

// ---- Storage helpers (bucket: "papers", private) ----
export async function sbUploadFile(bucket, storagePath, buffer, contentType) {
  const res = await fetch(`${URL}/storage/v1/object/${bucket}/${storagePath}`, {
    method: "POST",
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": contentType || "application/octet-stream", "x-upsert": "true" },
    body: buffer,
  });
  if (!res.ok) throw new Error(`Supabase Storage upload ${res.status}: ${(await res.text().catch(() => "")).slice(0, 200)}`);
  return storagePath;
}

export async function sbDownloadFile(bucket, storagePath) {
  const res = await fetch(`${URL}/storage/v1/object/${bucket}/${storagePath}`, {
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
  });
  if (!res.ok) throw new Error(`Supabase Storage download ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}
