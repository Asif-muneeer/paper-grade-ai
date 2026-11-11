import Link from "next/link";
export default function Home() {
  return (<div>
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom no-print"><div className="container"><a className="navbar-brand fw-bold" href="/">📝 Teacher Paper Checker</a><div className="ms-auto d-flex gap-2"><Link className="btn btn-outline-primary" href="/login">Log in</Link><Link className="btn btn-primary" href="/signup">Start free</Link></div></div></nav>
    <header className="hero py-5"><div className="container py-4"><h1 className="display-5 fw-bold">Grade a class set of paper tests in 15 minutes — not Sunday night.</h1><p className="lead mt-3">Upload a student&apos;s solved paper as a photo or PDF. Get a draft result against your answer key and rubric. You approve every grade.</p><div className="d-flex flex-wrap gap-2 mt-4"><Link className="btn btn-light btn-lg" href="/signup">Check 30 papers free</Link><a className="btn btn-outline-light btn-lg" href="#how">How it works</a></div><p className="mt-3 mb-0 small">No district sale required. No training on student data. Draft only — never a final grade alone.</p></div></header>
    <section className="container py-5"><div className="row g-3 text-center">
      <div className="col-md-4"><div className="card h-100 p-3"><h3>5–9.9 hrs / week</h3><p className="mb-0">US teachers spend about 5 hours a week grading (Merrimack 2022) — 9.9 hours in a 2025 Learnosity survey, with 95% taking grading home.</p></div></div>
      <div className="col-md-4"><div className="card h-100 p-3"><h3>3.6M teachers</h3><p className="mb-0">3,624,000 K–12 teachers in the USA (NCES, fall 2023). Paper tests are still the nightly job Gradescope, CoGrader and MagicSchool leave open.</p></div></div>
      <div className="col-md-4"><div className="card h-100 p-3"><h3>MCQ near-100%</h3><p className="mb-0">Multiple choice is scored deterministically against your key. Handwriting OCR is 70–85% — so low-confidence reads are flagged, never guessed.</p></div></div>
    </div></section>
    <section id="how" className="container py-4"><h2>How it works</h2><div className="row g-3 mt-2">
      <div className="col-md-4"><div className="card h-100 p-3"><h5>1. Key or rubric in</h5><p>Create a test: subject, class, total marks, MCQ key (A/B/C/D) and a rubric for short answers.</p></div></div>
      <div className="col-md-4"><div className="card h-100 p-3"><h5>2. Papers in</h5><p>Upload phone photos, a scanned PDF or a ZIP — one class set at a time. Student name / ID only.</p></div></div>
      <div className="col-md-4"><div className="card h-100 p-3"><h5>3. Result out</h5><p>Draft result grid, fix flagged reads, approve, then export a printable mark sheet and CSV for Google Classroom / Canvas.</p></div></div>
    </div></section>
    <section className="container py-4"><h2>New in V2 — ahead of the competition</h2><div className="row g-3 mt-2">
      <div className="col-md-4"><div className="card h-100 p-3 border-primary"><h5>📊 Class Analytics + Reteach</h5><p>Most-missed questions, weakest topics and per-student mastery — plus a printable reteach worksheet for exactly what the class missed. CoGrader and EssayGrader only give marks.</p></div></div>
      <div className="col-md-4"><div className="card h-100 p-3 border-primary"><h5>📐 STAAR / AP rubrics + maths steps</h5><p>Pre-built STAAR, FSA, Regents and AP rubrics, and maths step grading with partial credit — not just the final answer.</p></div></div>
      <div className="col-md-4"><div className="card h-100 p-3 border-primary"><h5>📄 Split a class PDF + Español</h5><p>Upload one class PDF, get one paper per student in name order. Feedback in English and Spanish for ESL families.</p></div></div>
    </div></section>
    <section className="container py-4"><h2>How we compare</h2><div className="table-responsive"><table className="table table-bordered bg-white"><thead><tr><th>Tool</th><th>Paper / handwritten tests</th><th>Price (individual)</th></tr></thead><tbody>
      <tr><td><strong>Teacher Paper Checker</strong></td><td>Yes — the whole product</td><td>Free 30/mo, then $15/mo</td></tr>
      <tr><td>Gradescope (Turnitin)</td><td>Yes, but institutional licence only</td><td>~$3–$4 / student / year</td></tr>
      <tr><td>CoGrader</td><td>No — typed essays via Classroom</td><td>Free 150/mo, $15/mo</td></tr>
      <tr><td>EssayGrader</td><td>No — typed essays only</td><td>Free 100/mo, $14.99/mo</td></tr>
      <tr><td>MagicSchool</td><td>No — prep tools, not paper grading</td><td>Free, Plus $12.99/mo</td></tr>
    </tbody></table></div></section>
    <section className="container py-4"><h2>Pricing</h2><div className="row g-3">
      <div className="col-md-6"><div className="card h-100 p-4"><h4>Free — $0</h4><p>30 papers / month, 1 class, MCQ + short answer, CSV export.</p><Link className="btn btn-outline-primary" href="/signup">Start free</Link></div></div>
      <div className="col-md-6"><div className="card h-100 p-4 border-primary"><h4>Teacher — $15/mo billed annually ($19 monthly)</h4><p>800 papers / month, unlimited classes, feedback PDFs, priority processing.</p><Link className="btn btn-primary" href="/signup">Start free, upgrade later</Link></div></div>
    </div></section>
    <section className="container py-4"><h2>FAQ</h2>
      <p><strong>Is the grade final?</strong> No. Every result is a draft. You review the grid, fix flagged reads and approve — the teacher always makes the final call.</p>
      <p><strong>What about FERPA?</strong> We store first name / student ID only — no email, no date of birth. No training on student data. A signed DPA is available, and you can delete a whole class set in one click.</p>
      <p><strong>Does it work on my phone?</strong> Yes — the upload flow is mobile-first. Photograph the stack, upload, review on any device.</p>
      <p><strong>What is NOT in V2?</strong> No LMS grade passback, no bubble-sheet printing, no plagiarism / AI detection, no gradebook or district admin. Maths step grading, the rubric library, analytics and Spanish feedback ARE in V2.</p>
    </section>
    <footer className="bg-white border-top py-4 no-print"><div className="container small text-muted">Teacher Paper Checker — USA teachers. Demo mode grades with built-in rules when no OpenAI key is set; live mode uses the OpenAI Vision API. Keyword volumes in our research are estimates — verify in Keyword Planner before building pages.</div></footer>
  </div>);
}
