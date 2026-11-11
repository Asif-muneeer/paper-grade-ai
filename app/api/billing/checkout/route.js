import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";
import { currentUser } from "@/lib/session";
import { PLANS } from "@/lib/billing";
// Demo checkout: switches the plan, no real charge. Real money goes through
// Lemon Squeezy / Paddle (merchant of record), see README "Go live".
export async function POST(req) {
  const { user, db } = currentUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const { plan } = await req.json();
  if (!PLANS[plan] || plan === "free") return NextResponse.json({ error: "Choose the Teacher plan to upgrade." }, { status: 400 });
  user.plan = plan; writeDB(db);
  return NextResponse.json({ ok: true, demo: true, note: "Demo checkout, no card was charged. Connect Lemon Squeezy / Paddle for real payments." });
}
