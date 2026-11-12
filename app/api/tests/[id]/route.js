import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";
import { currentUser } from "@/lib/session";
export async function GET(req, { params }) {
  const { user, db } = await currentUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const test = db.tests.find((t) => t.id === params.id && t.userId === user.id);
  if (!test) return NextResponse.json({ error: "Test not found" }, { status: 404 });
  return NextResponse.json({ test, papers: db.papers.filter((p) => p.testId === test.id) });
}
export async function DELETE(req, { params }) {
  const { user, db } = await currentUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  db.tests = db.tests.filter((t) => !(t.id === params.id && t.userId === user.id));
  db.papers = db.papers.filter((p) => p.testId !== params.id);
  await writeDB(db);
  return NextResponse.json({ ok: true });
}
