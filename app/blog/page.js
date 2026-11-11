import Link from "next/link";
import { LogoIcon } from "../components/icons";
import { ARTICLES } from "./articles";

export const metadata = { title: "Blog | PaperGradeAI", description: "Practical guides for US teachers: grading paper tests faster, rubrics, reteach worksheets and more." };

export default function BlogIndex() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom no-print"><div className="container"><a className="navbar-brand fw-bold" href="/"><span className="brand-icon"><LogoIcon size={20} /></span> PaperGradeAI</a><div className="ms-auto d-flex gap-2"><Link className="btn btn-outline-primary" href="/login">Log in</Link><Link className="btn btn-primary" href="/signup">Check 30 papers free</Link></div></div></nav>
      <div className="container py-5">
        <h1>Blog</h1>
        <p className="lead">Practical guides for US teachers who still grade on paper.</p>
        <div className="row g-3 mt-3">
          {ARTICLES.map((a) => (
            <div className="col-md-6" key={a.slug}>
              <div className="card h-100 p-4">
                <p className="small text-muted mb-1">{a.date}</p>
                <h3><Link href={`/blog/${a.slug}`}>{a.title}</Link></h3>
                <p>{a.excerpt}</p>
                <Link className="btn btn-outline-primary" href={`/blog/${a.slug}`}>Read the guide</Link>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4"><Link href="/">← Back to home</Link></p>
      </div>
      <footer className="bg-white border-top py-4 no-print"><div className="container small text-muted">© 2026 PaperGradeAI. <Link href="/">Home</Link> · <Link href="/blog">Blog</Link> · <Link href="/login">Log in</Link></div></footer>
    </div>
  );
}
