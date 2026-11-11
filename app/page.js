"use client";
import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#workflow", label: "Workflow" },
  { href: "#security", label: "Security" },
  { href: "#free", label: "Free plan" },
  { href: "#team", label: "Team" },
  { href: "#faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="landing">
      {/* Sticky professional navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top landing-nav">
        <div className="container">
          <a className="navbar-brand fw-bold d-flex align-items-center gap-2" href="/">
            <span className="logo-mark">📄</span> PaperGradeAI
          </a>
          <button className="navbar-toggler" type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {NAV_LINKS.map((l) => (
                <li className="nav-item" key={l.href}>
                  <a className="nav-link" href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
                </li>
              ))}
            </ul>
            <div className="d-flex gap-2">
              <Link className="btn btn-outline-primary" href="/login">Log in</Link>
              <Link className="btn btn-primary" href="/signup">Check 30 papers free</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero py-5">
        <div className="container py-4">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="badge bg-light text-primary mb-3 px-3 py-2">For US K-12 teachers</span>
              <h1 className="display-5 fw-bold">Grade a class set of paper tests in 15 minutes, not Sunday night.</h1>
              <p className="lead mt-3">Upload a student&apos;s solved paper as a photo or PDF. Get a draft result against your answer key and rubric. You approve every grade.</p>
              <div className="d-flex flex-wrap gap-2 mt-4">
                <Link className="btn btn-light btn-lg" href="/signup">Check 30 papers free</Link>
                <a className="btn btn-outline-light btn-lg" href="#how">See how it works</a>
              </div>
              <p className="mt-3 mb-0 small">No district sale required. No training on student data. Draft only, never a final grade alone.</p>
            </div>
            <div className="col-lg-5">
              <div className="card shadow hero-card text-dark">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>Grade 7 Science: 7B</strong>
                    <span className="badge bg-primary">Class avg 62%</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between py-1"><span>Ava Johnson</span><span><strong>93%</strong> <span className="badge bg-success">Mastered</span></span></div>
                  <div className="d-flex justify-content-between py-1"><span>Maya Patel</span><span><strong>64%</strong> <span className="badge bg-warning text-dark">Developing</span></span></div>
                  <div className="d-flex justify-content-between py-1"><span>Liam Carter</span><span><strong>29%</strong> <span className="badge bg-danger">Needs support</span></span></div>
                  <hr />
                  <p className="mb-1 small text-muted">Most-missed question</p>
                  <p className="mb-0"><strong>Q5, 52% correct.</strong> Reteach worksheet ready.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats strip */}
      <section className="container py-5">
        <div className="row g-3 text-center">
          <div className="col-6 col-md-3"><div className="card h-100 p-3"><h3>5-9.9 hrs / week</h3><p className="mb-0 small">US teachers spend about 5 hours a week grading (Merrimack 2022), 9.9 hours in a 2025 Learnosity survey, with 95% taking grading home.</p></div></div>
          <div className="col-6 col-md-3"><div className="card h-100 p-3"><h3>3.6M teachers</h3><p className="mb-0 small">3,624,000 K-12 teachers in the USA (NCES, fall 2023). Paper tests are still the nightly job other tools leave open.</p></div></div>
          <div className="col-6 col-md-3"><div className="card h-100 p-3"><h3>MCQ near-100%</h3><p className="mb-0 small">Multiple choice is scored deterministically against your key. Handwriting OCR is 70-85%, low-confidence reads are flagged, never guessed.</p></div></div>
          <div className="col-6 col-md-3"><div className="card h-100 p-3"><h3>15 minutes</h3><p className="mb-0 small">A whole class set, checked, reviewed and approved, in about the time of one coffee break.</p></div></div>
        </div>
      </section>

      {/* Why PaperGradeAI */}
      <section className="container py-4">
        <h2 className="text-center">Why teachers choose PaperGradeAI</h2>
        <p className="text-center text-muted">Built for the work that still happens on paper.</p>
        <div className="row g-3 mt-2">
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5>📝 Grades any paper test</h5><p className="mb-0">MCQ, short answer and maths with step-by-step partial credit, including handwritten papers photographed on a phone.</p></div></div>
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5>📐 Rubrics + state standards</h5><p className="mb-0">Pre-built STAAR, FSA, Regents and AP rubrics. Pick one when you create a test instead of writing a rubric from scratch.</p></div></div>
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5>💬 Feedback that helps students</h5><p className="mb-0">Plain-language feedback for every student, in English and Spanish, so families can follow the next step.</p></div></div>
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5>📊 Analytics + Reteach</h5><p className="mb-0">Most-missed questions, weakest topics and per-student mastery, plus a printable reteach worksheet for exactly what the class missed.</p></div></div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="container py-5">
        <h2 className="text-center">How it works</h2>
        <p className="text-center text-muted">The tool reads each paper against your key and rubric, and drafts scores and comments. You review, adjust and approve. You stay in control of every grade.</p>
        <div className="row g-3 mt-3">
          <div className="col-md-4"><div className="card h-100 p-4 text-center"><div className="step-num">1</div><h5 className="mt-3">Choose your rubric / key</h5><p className="mb-0">Create a test: subject, class and total marks. Add the MCQ key, a model answer for short answers, and pick a STAAR, FSA, Regents or AP rubric, or write your own.</p></div></div>
          <div className="col-md-4"><div className="card h-100 p-4 text-center"><div className="step-num">2</div><h5 className="mt-3">Upload student papers</h5><p className="mb-0">Photograph the stack or upload one class PDF. The tool splits a whole-class PDF, one paper per student, in name order. Student name / ID only.</p></div></div>
          <div className="col-md-4"><div className="card h-100 p-4 text-center"><div className="step-num">3</div><h5 className="mt-3">Review &amp; approve</h5><p className="mb-0">Check the draft grid, fix the flagged reads, approve, then print the mark sheet and export the CSV for your gradebook.</p></div></div>
        </div>
        <div className="text-center mt-4"><Link className="btn btn-primary btn-lg" href="/signup">Grade 30 papers free</Link></div>
      </section>

      {/* Explore PaperGradeAI */}
      <section className="explore-section py-5">
        <div className="container position-relative py-4">
          <span className="explore-deco explore-deco-star" aria-hidden="true">✳️</span>
          <span className="explore-deco explore-deco-sun" aria-hidden="true">🌻</span>
          <h2 className="explore-title text-center">Explore PaperGradeAI</h2>
          <div className="row g-4 mt-4 justify-content-center">
            <div className="col-md-4">
              <Link href="/signup" className="explore-card">
                <div className="d-flex justify-content-between align-items-start">
                  <h5>AI Grader</h5>
                  <span className="explore-arrow" aria-hidden="true">→</span>
                </div>
                <p className="mb-0">Grade paper tests against your answer key and rubric with draft scores and detailed feedback.</p>
              </Link>
            </div>
            <div className="col-md-4">
              <Link href="/signup" className="explore-card">
                <div className="d-flex justify-content-between align-items-start">
                  <h5>Paper Grader</h5>
                  <span className="explore-arrow" aria-hidden="true">→</span>
                </div>
                <p className="mb-0">Grade handwritten and printed papers, scan, upload, done.</p>
              </Link>
            </div>
            <div className="col-md-4">
              <Link href="#team" className="explore-card">
                <div className="d-flex justify-content-between align-items-start">
                  <h5>PaperGradeAI for K-12 Schools &amp; Districts</h5>
                  <span className="explore-arrow" aria-hidden="true">→</span>
                </div>
                <p className="mb-0">Consistent grading, class writing data and teacher-approved grades.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Free plan includes */}
      <section id="free" className="container py-5">
        <h2 className="text-center">What the Free Plan includes</h2>
        <p className="text-center text-muted">Start free. Upgrade only when a whole class set a month is not enough.</p>
        <div className="table-responsive mt-3">
          <table className="table table-bordered bg-white align-middle">
            <thead className="table-light"><tr><th>What you get</th><th>Free, $0</th><th>Teacher, $15/mo annual ($19 monthly)</th></tr></thead>
            <tbody>
              <tr><td>Papers per month</td><td><strong>30</strong></td><td><strong>800</strong></td></tr>
              <tr><td>Classes</td><td>1</td><td>Unlimited</td></tr>
              <tr><td>MCQ + short answer + maths step grading</td><td>✓ Included</td><td>✓ Included</td></tr>
              <tr><td>Rubric library (STAAR, FSA, Regents, AP)</td><td>✓ Included</td><td>✓ Included</td></tr>
              <tr><td>Class Analytics + Reteach worksheet</td><td>✓ Included</td><td>✓ Included</td></tr>
              <tr><td>Feedback in English + Spanish</td><td>✓ Included</td><td>✓ Included</td></tr>
              <tr><td>Printable mark sheet + CSV export</td><td>✓ Included</td><td>✓ Included</td></tr>
              <tr><td>Class PDF auto-split</td><td>✓ Included</td><td>✓ Included</td></tr>
            </tbody>
          </table>
        </div>
        <div className="text-center"><Link className="btn btn-primary" href="/signup">Start free, no card needed</Link></div>
      </section>

      {/* V2 advanced strip */}
      <section className="container py-4">
        <h2>New in V2, ahead of the competition</h2>
        <div className="row g-3 mt-2">
          <div className="col-md-4"><div className="card h-100 p-3 border-primary"><h5>📊 Class Analytics + Reteach</h5><p className="mb-0">Most-missed questions, weakest topics and per-student mastery, plus a printable reteach worksheet for exactly what the class missed.</p></div></div>
          <div className="col-md-4"><div className="card h-100 p-3 border-primary"><h5>📐 STAAR / AP rubrics + maths steps</h5><p className="mb-0">Pre-built STAAR, FSA, Regents and AP rubrics, and maths step grading with partial credit, not just the final answer.</p></div></div>
          <div className="col-md-4"><div className="card h-100 p-3 border-primary"><h5>📄 Split a class PDF + Español</h5><p className="mb-0">Upload one class PDF, get one paper per student in name order. Feedback in English and Spanish for ESL families.</p></div></div>
        </div>
      </section>

      {/* Compare */}
      <section className="container py-4">
        <h2>How we compare</h2>
        <div className="table-responsive"><table className="table table-bordered bg-white"><thead><tr><th>Tool</th><th>Paper / handwritten tests</th><th>Price (individual)</th></tr></thead><tbody>
          <tr><td><strong>PaperGradeAI</strong></td><td>Yes, the whole product</td><td>Free 30/mo, then $15/mo</td></tr>
          <tr><td>Gradescope (Turnitin)</td><td>Yes, but institutional licence only</td><td>~$3-$4 / student / year</td></tr>
          <tr><td>CoGrader</td><td>No, typed essays via Classroom</td><td>Free 150/mo, $15/mo</td></tr>
          <tr><td>EssayGrader</td><td>No, typed essays only</td><td>Free 100/mo, $14.99/mo</td></tr>
          <tr><td>MagicSchool</td><td>No, prep tools, not paper grading</td><td>Free, Plus $12.99/mo</td></tr>
        </tbody></table></div>
      </section>


      {/* Workflow: how it fits your grading workflow */}
      <section id="workflow" className="section-alt py-5">
        <div className="container">
          <p className="eyebrow text-center mb-2">Your workflow</p>
          <h2 className="text-center">How PaperGradeAI fits your grading workflow</h2>
          <p className="text-center text-muted">No new system to learn, no LMS to connect. It slots into the way you already grade paper tests.</p>
          <div className="row g-3 mt-3">
            <div className="col-md-4"><div className="card h-100 p-4"><div className="step-num">1</div><h5 className="mt-3 text-center">Create the test with your key and rubric</h5><p className="mb-0">Add the subject, class and total marks, then the MCQ key, a model answer for short answers, and a pre-built STAAR, FSA, Regents or AP rubric, or write your own.</p></div></div>
            <div className="col-md-4"><div className="card h-100 p-4"><div className="step-num">2</div><h5 className="mt-3 text-center">Upload the whole class at once</h5><p className="mb-0">Photograph the stack on your phone, or upload one class PDF. The tool splits it automatically, one paper per student, in name order. Student name and ID only.</p></div></div>
            <div className="col-md-4"><div className="card h-100 p-4"><div className="step-num">3</div><h5 className="mt-3 text-center">Review, approve and export</h5><p className="mb-0">Check the draft grid, fix the flagged reads, approve, then print the mark sheet and export the CSV straight into your gradebook.</p></div></div>
          </div>
        </div>
      </section>

      {/* Handwritten work */}
      <section id="handwriting" className="container py-5">
        <p className="eyebrow text-center mb-2">Handwritten papers</p>
        <h2 className="text-center">Can PaperGradeAI read handwritten work?</h2>
        <p className="text-center text-muted">Yes. Paper tests are the whole point, not an afterthought.</p>
        <div className="row g-3 mt-3">
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5>📱 Scan from anywhere</h5><p className="mb-0">Scan from a phone, a tablet or a school printer. A clear photo is enough to start.</p></div></div>
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5>📄 Upload the whole class at once</h5><p className="mb-0">Upload one PDF with the entire class set. PaperGradeAI separates it into one paper per student.</p></div></div>
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5>✍️ Reads print and messy handwriting</h5><p className="mb-0">Print, cursive and messy handwriting are all read, then scored against your key and rubric.</p></div></div>
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5>🚩 Flagged, never guessed</h5><p className="mb-0">Low-confidence reads are highlighted for you to check. Handwriting reads at about 70 to 85 percent, so nothing uncertain becomes a grade on its own.</p></div></div>
        </div>
      </section>

      {/* Standards-aligned grading */}
      <section id="standards" className="section-alt py-5">
        <div className="container">
          <p className="eyebrow text-center mb-2">Standards aligned</p>
          <h2 className="text-center">Standards-aligned paper grading</h2>
          <p className="text-center text-muted">Score each paper against your rubric while measuring the class against state standards.</p>
          <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
            <span className="rubric-chip">STAAR</span><span className="rubric-chip">FSA</span><span className="rubric-chip">Regents</span><span className="rubric-chip">AP</span>
          </div>
          <div className="row g-3 mt-3">
            <div className="col-md-4"><div className="card h-100 p-4"><h5>📐 Pre-built rubrics</h5><p className="mb-0">Pick a STAAR, FSA, Regents or AP rubric when you create a test, instead of writing a rubric from scratch.</p></div></div>
            <div className="col-md-4"><div className="card h-100 p-4"><h5>🎯 Rubric plus standards</h5><p className="mb-0">Every answer is scored against your rubric, and the class view shows how students are doing against the standard behind it.</p></div></div>
            <div className="col-md-4"><div className="card h-100 p-4"><h5>🧮 Maths steps count too</h5><p className="mb-0">Maths answers earn partial credit step by step, not just for the final answer, so working is rewarded the way you would reward it.</p></div></div>
          </div>
        </div>
      </section>

      {/* Growth tracking */}
      <section id="growth" className="container py-5">
        <p className="eyebrow text-center mb-2">Student growth</p>
        <h2 className="text-center">Track student growth, not just scores</h2>
        <p className="text-center text-muted">A total tells you who passed. PaperGradeAI shows you what to teach next.</p>
        <div className="row g-3 mt-3">
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5>📈 Class trends</h5><p className="mb-0">See how the whole class performed across the test, question by question, so patterns stand out at a glance.</p></div></div>
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5>👩‍🎓 Per-student mastery</h5><p className="mb-0">Every student gets a mastery level, Mastered, Developing or Needs support, so you know who needs help first.</p></div></div>
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5>❓ Most-missed questions</h5><p className="mb-0">The questions the class missed most are listed first, with the percentage who got each one right.</p></div></div>
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5>📝 Reteach priority list</h5><p className="mb-0">Get a short reteach priority list and a printable worksheet for exactly the topics the class missed.</p></div></div>
        </div>
      </section>

      {/* Accuracy, honestly */}
      <section id="accuracy" className="section-alt py-5">
        <div className="container">
          <p className="eyebrow text-center mb-2">Accuracy, honestly</p>
          <h2 className="text-center">Grades like a careful teacher, checked by you</h2>
          <p className="text-center text-muted">No inflated accuracy claims. Here is exactly what the tool does, and where you stay in charge.</p>
          <div className="row g-3 mt-3 text-center">
            <div className="col-md-4"><div className="card h-100 p-4"><div className="accuracy-num">Near-100%</div><h5 className="mt-2">Multiple choice</h5><p className="mb-0">MCQ is scored deterministically against your answer key, so a legible answer is marked right every time.</p></div></div>
            <div className="col-md-4"><div className="card h-100 p-4"><div className="accuracy-num">70-85%</div><h5 className="mt-2">Handwriting reads</h5><p className="mb-0">Handwriting is read at about 70 to 85 percent. Low-confidence rows are highlighted for you to check, never guessed.</p></div></div>
            <div className="col-md-4"><div className="card h-100 p-4"><div className="accuracy-num">Every grade</div><h5 className="mt-2">Approved by you</h5><p className="mb-0">Every result is a draft until you approve it. The teacher always makes the final call, on every paper.</p></div></div>
          </div>
        </div>
      </section>

      {/* Security and trust */}
      <section id="security" className="container py-5">
        <p className="eyebrow text-center mb-2">Security and trust</p>
        <h2 className="text-center">Your student and teacher data is always safe</h2>
        <p className="text-center text-muted">Student work is never used to train AI models. Only you see your students grades and feedback.</p>
        <div className="row g-3 mt-3 text-center">
          <div className="col-6 col-md-3"><div className="card h-100 p-3 trust-badge"><div className="trust-icon">🔒</div><h5 className="mt-2">Data never used to train AI</h5></div></div>
          <div className="col-6 col-md-3"><div className="card h-100 p-3 trust-badge"><div className="trust-icon">🚫</div><h5 className="mt-2">Data never shared or sold</h5></div></div>
          <div className="col-6 col-md-3"><div className="card h-100 p-3 trust-badge"><div className="trust-icon">✅</div><h5 className="mt-2">Full teacher control</h5></div></div>
          <div className="col-6 col-md-3"><div className="card h-100 p-3 trust-badge"><div className="trust-icon">🗑️</div><h5 className="mt-2">Delete data any time</h5></div></div>
        </div>
        <p className="text-center text-muted mt-4 mb-0">FERPA friendly: we store first name and student ID only, no email, no date of birth. A signed DPA is available, and you can delete a whole class set in one click.</p>
      </section>

      {/* Team */}
      <section id="team" className="container py-5">
        <h2 className="text-center">Built for teachers, by a small team</h2>
        <p className="text-center text-muted">No big company, no district sales team, a focused product built with teachers in mind.</p>
        <div className="row g-3 mt-3 justify-content-center">
          <div className="col-md-5"><div className="card h-100 p-4 text-center"><img className="team-photo" src="/team/muhammad-asif.jpg" alt="Muhammad Asif" width="120" height="120" /><h5 className="mt-3">Muhammad Asif</h5><p className="text-muted mb-1">Founder, Product &amp; SEO</p><p className="mb-0 small">Owner of papergradeai.com. SEO specialist who builds tools for the work teachers actually do on paper.</p></div></div>
          <div className="col-md-5"><div className="card h-100 p-4 text-center"><img className="team-photo" src="/team/zain-ul-abideen.jpg" alt="Zain ul Abideen" width="120" height="120" /><h5 className="mt-3">Zain ul Abideen</h5><p className="text-muted mb-1">AI &amp; Research, Development</p><p className="mb-0 small">Worked alongside the founder to build PaperGradeAI, from AI grading and market research to the analytics and reteach reports.</p></div></div>
        </div>
        <p className="text-center text-muted mt-3 mb-0">Teacher advisors: US K-12 teachers test new features and tell us what to fix, advisor spots are open.</p>
      </section>

      {/* FAQ */}
      <section id="faq" className="container py-5">
        <h2 className="text-center">Frequently asked questions</h2>
        <p className="text-center text-muted">Our answers to the most common questions teachers ask us.</p>
        <div className="row justify-content-center mt-3"><div className="col-lg-8">
          <div className="card p-4 mb-3"><h5>Is the grade final?</h5><p className="mb-0">No. Every result is a draft. You review the grid, fix flagged reads and approve, the teacher always makes the final call.</p></div>
          <div className="card p-4 mb-3"><h5>How accurate is the grading?</h5><p className="mb-0">Multiple choice is scored deterministically against your key, at near 100% when the answer is legible. Handwriting reads at about 70-85%, so low-confidence reads are flagged for you to check, never guessed.</p></div>
          <div className="card p-4 mb-3"><h5>Does it read handwriting?</h5><p className="mb-0">Yes. Photograph a paper on your phone or upload a scanned PDF. A whole-class PDF is split automatically, one paper per student, in name order.</p></div>
          <div className="card p-4 mb-3"><h5>What about FERPA?</h5><p className="mb-0">We store first name / student ID only, no email, no date of birth. No training on student data. A signed DPA is available, and you can delete a whole class set in one click.</p></div>
          <div className="card p-4 mb-3"><h5>What does the Free plan include?</h5><p className="mb-0">30 papers a month, 1 class, MCQ + short answer + maths, the rubric library, analytics and reteach, Spanish feedback, and CSV export. No card needed.</p></div>
          <div className="card p-4 mb-3"><h5>Can I cancel anytime?</h5><p className="mb-0">Yes, there is no lock-in. Payments are demo-only until Lemon Squeezy / Paddle checkout is connected, so nothing is charged today.</p></div>
        </div></div>
      </section>

      {/* Final CTA */}
      <section className="cta-band py-5">
        <div className="container text-center text-white">
          <h2>Try your next class set free</h2>
          <p className="lead">30 papers a month, free. No card, no district sale.</p>
          <Link className="btn btn-light btn-lg" href="/signup">Check 30 papers free</Link>
        </div>
      </section>

      {/* Rich footer */}
      <footer className="site-footer py-5 no-print">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3">
              <h5>📄 PaperGradeAI</h5>
              <p className="small text-muted">Grade a class set of paper tests in 15 minutes, not Sunday night. Built for US K-12 teachers.</p>
            </div>
            <div className="col-md-3">
              <h6>Product</h6>
              <ul className="list-unstyled small">
                <li><a href="#how">How it works</a></li>
                <li><a href="#free">Free plan</a></li>
                <li><a href="#free">Pricing</a></li>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/login">Log in</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h6>Resources</h6>
              <ul className="list-unstyled small">
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/blog/how-to-grade-a-class-set-of-paper-tests-in-15-minutes">How to grade in 15 minutes</Link></li>
                <li><Link href="/blog/mcq-vs-short-answer-how-ai-checks-each-one">MCQ vs short answer</Link></li>
                <li><Link href="/blog/what-is-a-reteach-worksheet-and-when-to-use-one">Reteach worksheets</Link></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h6>Company</h6>
              <ul className="list-unstyled small">
                <li><a href="#team">About / Team</a></li>
                <li><a href="https://papergradeai.com/">papergradeai.com</a></li>
                <li><Link href="/login">Demo login: demo@teacherpaper.com</Link></li>
              </ul>
              <h6 className="mt-3">Legal</h6>
              <ul className="list-unstyled small">
                <li><a href="#faq">Privacy / FERPA</a></li>
                <li><a href="#faq">Terms</a></li>
                <li>No training on student data</li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="d-flex flex-wrap justify-content-between small text-muted">
            <span>© 2026 PaperGradeAI. Made for US teachers.</span>
            <span>Demo mode grades with built-in rules when no OpenAI key is set.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
