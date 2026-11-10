# Teacher Paper Checker — MVP (V1) + Advanced V2

## V2 — what is new (ahead of CoGrader / EssayGrader / Gradescope)

1. **Class Analytics + Reteach Report** — `lib/analytics.js` + page
   `/dashboard/tests/[id]/analytics`: most-missed questions ranked, weakest
   topics, per-student mastery (Mastered 80%+ / Developing 50–79% / Needs
   support under 50%), class average. **Reteach worksheet**: `lib/reteach.js`
   + `GET /api/tests/[id]/reteach` — 2 practice items per most-missed
   question, answer key on page 2, printable. Demo: templates from the
   original question; live (OPENAI_API_KEY): OpenAI generates similar items,
   falling back to templates on error.
2. **STAAR / AP Rubric Library + Maths Step Grading** — `lib/rubrics.js`:
   STAAR ELA/Maths, FSA, Regents, AP Lang, AP Calc AB, AP Bio. Pick one in
   the create-test form and it auto-fills short-answer rubrics (editable).
   New question type `math`: final answer scored exactly, up to 3 steps with
   marks each, partial credit + per-step reason + confidence in
   `lib/grading.js`. Draft only — teacher approves, as always. Demo test
   now has a maths question (Q6, 2x + 6 = 14; total 20 marks).
3. **Auto Page-Split + Spanish Feedback** — Split mode in
   `POST /api/papers` (`mode=split`): one class PDF + names (one per line) +
   optional ranges ("Ava: 1-2") creates one paper per student in list order;
   the page mapping is stored visibly (`splitInfo`) — no PDF pages are cut
   apart (no PDF parser dependency). Spanish feedback: `lib/feedback.js` +
   `GET /api/tests/[id]/feedback` — EN + ES toggle on the results page.
   Demo: template dictionary, English always shown alongside Spanish. Live:
   OpenAI translates, falling back to templates on error.

# Teacher Paper Checker — MVP (V1)

Teacher uploads a student's **solved paper as a photo or PDF**. The tool checks it
against the teacher's **answer key + rubric** and returns a **draft result** the
teacher approves. Narrow wedge only: scanned/handwritten paper tests + MCQ +
short answer. USA teachers, $15/mo annual / $19 monthly.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # production server
```

Demo login: **demo@teacherpaper.com / demo1234** — one ready test (Grade 7
Science, 5 questions) and 3 pre-graded papers.

## Stack (best for this builder — HTML/CSS/JS/React/Bootstrap)

- Next.js 14, React + Bootstrap 5 (CDN), pure JavaScript ES6+
- **Zero extra runtime dependencies** beyond next/react/react-dom
- Auth: scrypt + HMAC-signed cookie sessions (Node crypto, `lib/auth.js`)
- Data: `lib/db.js` JSON file store — the ONE file to swap for Supabase/Postgres
- AI: `lib/ai.js` — real OpenAI Vision API when `OPENAI_API_KEY` is set,
  otherwise a built-in DEMO grader with the same rules (MCQ deterministic,
  short-answer rubric draft + confidence flag). Never auto-finalises.
- Billing: demo checkout in `lib/billing.js` (no real charge). Real money:
  **Lemon Squeezy or Paddle** as merchant of record (handles US sales tax for a
  Pakistan-based seller); Stripe direct only if eligible.

## What is demo vs live

| Feature | Demo (no keys) | Live |
|---|---|---|
| Signup/login, tests, upload, review, CSV, billing switch | Works | Works |
| Grading | Built-in rules (MCQ exact match; short answer keyword/rubric draft) | OpenAI Vision reads the image, then the same rules score it; falls back to demo on error |
| Payments | Demo checkout, $0 charged | Lemon Squeezy / Paddle checkout |

## Go live (Vercel)

1. Push to GitHub, import into Vercel, deploy.
2. Set env vars: `SESSION_SECRET` (random string), `OPENAI_API_KEY`.
3. Swap `lib/db.js` for Supabase/Postgres before the first paying teacher
   (the JSON file does not persist on Vercel).
4. Connect Lemon Squeezy / Paddle and replace the demo checkout in
   `app/api/billing/checkout/route.js` with their checkout link.
5. Uploads: move `data/uploads` to Supabase Storage / S3 in the same swap.

## NOT in V2

LMS grade passback (CSV is the integration), bubble-sheet template printing,
plagiarism / AI detection, gradebook, district admin / rostering
(Clever/ClassLink). Maths step grading, the rubric library, analytics,
reteach and Spanish feedback ARE in V2 (see top).

## Privacy (FERPA)

Student name / ID only — no email, no date of birth. No training on student
data. DPA ready. Delete a whole class set in one click (Settings). Free plan
images auto-delete after 90 days.
