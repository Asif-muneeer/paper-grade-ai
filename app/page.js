"use client";
import { useState } from "react";
import Link from "next/link";
import { LogoIcon, PencilIcon, PenIcon, RubricIcon, ChatIcon, ChartIcon, TrendIcon, LayersIcon, ScanIcon, UploadIcon, FlagIcon, TargetIcon, CalculatorIcon, GradCapIcon, QuestionIcon, LockIcon, NoShareIcon, CheckCircleIcon, CheckIcon, TrashIcon, SparkleIcon, SunIcon, BookIcon, DocIcon } from "./components/icons";

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
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img src="/logo.svg" alt="PaperGradeAI" className="site-logo" height="36" width="164" />
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
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5><PencilIcon size={22} className="card-icon" /> Grades any paper test</h5><p className="mb-0">MCQ, short answer and maths with step-by-step partial credit, including handwritten papers photographed on a phone.</p></div></div>
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5><RubricIcon size={22} className="card-icon" /> Rubrics + state standards</h5><p className="mb-0">Pre-built STAAR, FSA, Regents and AP rubrics. Pick one when you create a test instead of writing a rubric from scratch.</p></div></div>
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5><ChatIcon size={22} className="card-icon" /> Feedback that helps students</h5><p className="mb-0">Plain-language feedback for every student, in English and Spanish, so families can follow the next step.</p></div></div>
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5><ChartIcon size={22} className="card-icon" /> Analytics + Reteach</h5><p className="mb-0">Most-missed questions, weakest topics and per-student mastery, plus a printable reteach worksheet for exactly what the class missed.</p></div></div>
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
          <span className="explore-deco explore-deco-star" aria-hidden="true"><SparkleIcon size={40} /></span>
          <span className="explore-deco explore-deco-sun" aria-hidden="true"><SunIcon size={44} /></span>
          <h2 className="explore-title text-center">Explore PaperGradeAI</h2>
          <div className="row g-4 mt-4 justify-content-center">
            <div className="col-md-4">
              <Link href="/signup" className="explore-card">
                <div className="explore-icon"><PencilIcon size={26} /></div>
                <div className="d-flex justify-content-between align-items-start">
                  <h5>AI Grader</h5>
                  <span className="explore-arrow" aria-hidden="true">→</span>
                </div>
                <p className="mb-0">Grade paper tests against your answer key and rubric with draft scores and detailed feedback.</p>
              </Link>
            </div>
            <div className="col-md-4">
              <Link href="/signup" className="explore-card">
                <div className="explore-icon"><LogoIcon size={26} /></div>
                <div className="d-flex justify-content-between align-items-start">
                  <h5>Paper Grader</h5>
                  <span className="explore-arrow" aria-hidden="true">→</span>
                </div>
                <p className="mb-0">Grade handwritten and printed papers, scan, upload, done.</p>
              </Link>
            </div>
            <div className="col-md-4">
              <Link href="#team" className="explore-card">
                <div className="explore-icon"><GradCapIcon size={26} /></div>
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
          <div className="col-md-4"><div className="card h-100 p-3 border-primary"><h5><ChartIcon size={22} className="card-icon" /> Class Analytics + Reteach</h5><p className="mb-0">Most-missed questions, weakest topics and per-student mastery, plus a printable reteach worksheet for exactly what the class missed.</p></div></div>
          <div className="col-md-4"><div className="card h-100 p-3 border-primary"><h5><RubricIcon size={22} className="card-icon" /> STAAR / AP rubrics + maths steps</h5><p className="mb-0">Pre-built STAAR, FSA, Regents and AP rubrics, and maths step grading with partial credit, not just the final answer.</p></div></div>
          <div className="col-md-4"><div className="card h-100 p-3 border-primary"><h5><LayersIcon size={22} className="card-icon" /> Split a class PDF + Español</h5><p className="mb-0">Upload one class PDF, get one paper per student in name order. Feedback in English and Spanish for ESL families.</p></div></div>
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
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5><ScanIcon size={22} className="card-icon" /> Scan from anywhere</h5><p className="mb-0">Scan from a phone, a tablet or a school printer. A clear photo is enough to start.</p></div></div>
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5><UploadIcon size={22} className="card-icon" /> Upload the whole class at once</h5><p className="mb-0">Upload one PDF with the entire class set. PaperGradeAI separates it into one paper per student.</p></div></div>
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5><PenIcon size={22} className="card-icon" /> Reads print and messy handwriting</h5><p className="mb-0">Print, cursive and messy handwriting are all read, then scored against your key and rubric.</p></div></div>
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5><FlagIcon size={22} className="card-icon" /> Flagged, never guessed</h5><p className="mb-0">Low-confidence reads are highlighted for you to check. Handwriting reads at about 70 to 85 percent, so nothing uncertain becomes a grade on its own.</p></div></div>
        </div>
      </section>

      {/* Standards-aligned grading */}
      <section id="standards" className="standards-purple py-5 position-relative overflow-hidden">
        <div className="container py-4 position-relative">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <div className="staar-card">
                <div className="d-flex align-items-center gap-3 px-4 pt-4 pb-3">
                  <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
                    <defs><clipPath id="txFlagClip"><circle cx="24" cy="24" r="24" /></clipPath></defs>
                    <g clipPath="url(#txFlagClip)">
                      <rect x="0" y="0" width="19" height="48" fill="#002868" />
                      <rect x="19" y="0" width="29" height="24" fill="#FFFFFF" />
                      <rect x="19" y="24" width="29" height="24" fill="#BF0A30" />
                      <polygon fill="#FFFFFF" points="9.5,14 11.3,19.2 16.8,19.3 12.4,22.6 14,27.9 9.5,24.8 5,27.9 6.6,22.6 2.2,19.3 7.7,19.2" />
                    </g>
                  </svg>
                  <div>
                    <h5 className="mb-0">Texas STAAR</h5>
                    <p className="mb-0 small text-muted">Select academic standards</p>
                  </div>
                </div>
                <hr className="mx-4 my-0" />
                <div className="p-4">
                  <div className="staar-row">
                    <span className="staar-row-icon"><DocIcon size={20} /></span>
                    <div className="flex-grow-1">
                      <strong>Ideas &amp; organisation</strong>
                      <p className="mb-0 small text-muted">Clear controlling idea, logical order, introduction and conclusion.</p>
                    </div>
                    <span className="staar-check"><CheckIcon size={16} /></span>
                  </div>
                  <div className="staar-row">
                    <span className="staar-row-icon"><BookIcon size={20} /></span>
                    <div className="flex-grow-1">
                      <strong>Evidence &amp; support</strong>
                      <p className="mb-0 small text-muted">Relevant evidence from the text, explained not just quoted.</p>
                    </div>
                    <span className="staar-check"><CheckIcon size={16} /></span>
                  </div>
                  <div className="staar-row">
                    <span className="staar-row-icon"><PenIcon size={20} /></span>
                    <div className="flex-grow-1">
                      <strong>Language &amp; conventions</strong>
                      <p className="mb-0 small text-muted">Precise vocabulary, varied sentences, correct spelling and grammar.</p>
                    </div>
                    <span className="staar-check"><CheckIcon size={16} /></span>
                  </div>
                  <p className="small mt-3 mb-3 staar-selected"><CheckCircleIcon size={16} /> 3 standards selected</p>
                  <Link href="/signup" className="staar-cta"><CheckCircleIcon size={20} /> Great! Your paper is being graded</Link>
                  <p className="small text-muted mt-3 mb-0">From the STAAR: Texas ELA rubric in our library. FSA, Regents and AP rubrics work the same way.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <h2 className="standards-title">Standards-aligned paper grading</h2>
              <ul className="list-unstyled standards-points mt-4">
                <li>
                  <span className="standards-point-check"><CheckIcon size={18} /></span>
                  <div>
                    <strong>Get rubric-aligned scores</strong>
                    <p className="mb-0">Grade with pre-built <span className="text-amber">Texas STAAR</span>, Florida FSA, Regents and AP rubrics, picked when you create a test.</p>
                  </div>
                </li>
                <li>
                  <span className="standards-point-check"><CheckIcon size={18} /></span>
                  <div>
                    <strong>Measure student work against state standards</strong>
                    <p className="mb-0">See how your class is performing against the standards in your rubric, question by question.</p>
                  </div>
                </li>
                <li>
                  <span className="standards-point-check"><CheckIcon size={18} /></span>
                  <div>
                    <strong>Spot learning gaps early</strong>
                    <p className="mb-0">Compare class results with the rubric expectations and identify what to reteach, with a printable reteach worksheet, so you <span className="text-amber">spot learning gaps early</span>, before the next test.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <span className="standards-deco" aria-hidden="true">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <path d="M60 10 C75 35 85 45 110 60 C85 75 75 85 60 110 C45 85 35 75 10 60 C35 45 45 35 60 10 Z" fill="#FDE68A" opacity="0.9" />
            <circle cx="88" cy="88" r="16" fill="#7C3AED" />
          </svg>
        </span>
      </section>

      {/* Growth tracking */}
      <section id="growth" className="container py-5">
        <p className="eyebrow text-center mb-2">Student growth</p>
        <h2 className="text-center">Track student growth, not just scores</h2>
        <p className="text-center text-muted">A total tells you who passed. PaperGradeAI shows you what to teach next.</p>
        <div className="row g-3 mt-3">
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5><TrendIcon size={22} className="card-icon" /> Class trends</h5><p className="mb-0">See how the whole class performed across the test, question by question, so patterns stand out at a glance.</p></div></div>
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5><GradCapIcon size={22} className="card-icon" /> Per-student mastery</h5><p className="mb-0">Every student gets a mastery level, Mastered, Developing or Needs support, so you know who needs help first.</p></div></div>
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5><QuestionIcon size={22} className="card-icon" /> Most-missed questions</h5><p className="mb-0">The questions the class missed most are listed first, with the percentage who got each one right.</p></div></div>
          <div className="col-md-6 col-lg-3"><div className="card h-100 p-3"><h5><PencilIcon size={22} className="card-icon" /> Reteach priority list</h5><p className="mb-0">Get a short reteach priority list and a printable worksheet for exactly the topics the class missed.</p></div></div>
        </div>
      </section>

      {/* Accuracy and Security, side by side */}
      <section id="accuracy" className="section-alt py-5">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-6">
              <div className="duo-card duo-purple h-100">
                <p className="duo-eyebrow duo-eyebrow-light mb-2">Grading Accuracy</p>
                <h2>Grades like a careful teacher, checked by you</h2>
                <p className="mb-4">Every result is a draft. You review the grid, fix flagged reads and approve. The teacher always makes the final call.</p>
                <div className="row g-3">
                  <div className="col-6">
                    <div className="duo-stat">
                      <div className="duo-stat-num">Near-100%</div>
                      <p className="mb-0">MCQ scored deterministically against your answer key.</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="duo-stat">
                      <div className="duo-stat-num">70-85%</div>
                      <p className="mb-0">Handwriting read rate. Low-confidence reads are flagged for you, never guessed.</p>
                    </div>
                  </div>
                </div>
                <a className="duo-link duo-link-amber mt-4" href="#how">See how grading works <span aria-hidden="true">→</span></a>
              </div>
            </div>
            <div className="col-lg-6">
              <div id="security" className="duo-card duo-white h-100">
                <span className="duo-starburst" aria-hidden="true">
                  <svg width="64" height="64" viewBox="0 0 100 100" fill="none">
                    <defs><linearGradient id="burstGrad" x1="0" y1="0" x2="100" y2="100"><stop stopColor="#F59E0B" /><stop offset="1" stopColor="#F97316" /></linearGradient></defs>
                    <polygon fill="url(#burstGrad)" points="50,0 59,33 83,17 68,42 100,50 68,58 83,83 59,67 50,100 41,67 17,83 32,58 0,50 32,42 17,17 41,33" />
                  </svg>
                </span>
                <p className="duo-eyebrow mb-2">Security &amp; Trust</p>
                <h2>Your student and teacher data is <em>always</em> safe</h2>
                <p>Student work is never used to train AI models. Only you see your students grades and feedback.</p>
                <div className="d-flex flex-wrap gap-4 align-items-end">
                  <ul className="duo-checklist list-unstyled mb-0">
                    <li><CheckIcon size={18} /> Data never used to train AI</li>
                    <li><CheckIcon size={18} /> Data never shared or sold</li>
                    <li><CheckIcon size={18} /> Full teacher control</li>
                    <li><CheckIcon size={18} /> Delete data any time</li>
                    <li><CheckIcon size={18} /> First name and student ID only</li>
                  </ul>
                  <div className="duo-illustration" aria-hidden="true">
                    <svg width="180" height="160" viewBox="0 0 180 160" fill="none">
                      <defs>
                        <linearGradient id="folderBack" x1="0" y1="0" x2="180" y2="120"><stop stopColor="#C4B5FD" /><stop offset="1" stopColor="#A78BFA" /></linearGradient>
                        <linearGradient id="folderFront" x1="0" y1="0" x2="180" y2="120"><stop stopColor="#7C3AED" /><stop offset="1" stopColor="#4F46E5" /></linearGradient>
                      </defs>
                      <path d="M20 30h45l12 14h73a6 6 0 0 1 6 6v10H14V36a6 6 0 0 1 6-6z" fill="url(#folderBack)" />
                      <rect x="34" y="18" width="52" height="66" rx="4" fill="#fff" stroke="#DDD6FE" />
                      <path d="M42 32h36M42 42h36M42 52h24" stroke="#C4B5FD" strokeWidth="4" strokeLinecap="round" />
                      <rect x="58" y="26" width="52" height="66" rx="4" fill="#fff" stroke="#DDD6FE" />
                      <path d="M66 40h36M66 50h36M66 60h24" stroke="#C4B5FD" strokeWidth="4" strokeLinecap="round" />
                      <rect x="82" y="34" width="52" height="66" rx="4" fill="#F5F3FF" stroke="#DDD6FE" />
                      <path d="M90 48h36M90 58h36M90 68h24" stroke="#C4B5FD" strokeWidth="4" strokeLinecap="round" />
                      <path d="M14 62h152l-8 82a8 8 0 0 1-8 7H30a8 8 0 0 1-8-7l-8-82z" fill="url(#folderFront)" />
                      <circle cx="128" cy="118" r="26" fill="#fff" />
                      <rect x="118" y="114" width="20" height="16" rx="3" fill="#4F46E5" />
                      <path d="M122 114v-6a6 6 0 0 1 12 0v6" stroke="#4F46E5" strokeWidth="3" fill="none" />
                      <circle cx="128" cy="121" r="2.5" fill="#fff" />
                    </svg>
                  </div>
                </div>
                <a className="duo-link duo-link-purple mt-4" href="#faq">Read our FERPA answers <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
        </div>
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
              <h5><img src="/logo-light.svg" alt="PaperGradeAI" className="site-logo site-logo-footer" height="30" width="137" /></h5>
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
