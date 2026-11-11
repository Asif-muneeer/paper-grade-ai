import Link from "next/link";
import { ARTICLES, getArticle } from "../articles";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export default function BlogArticle({ params }) {
  const article = getArticle(params.slug);
  if (!article) {
    return (<div className="container py-5"><h1>Article not found</h1><p><Link href="/blog">← Back to Blog</Link></p></div>);
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom no-print"><div className="container"><a className="navbar-brand d-flex align-items-center" href="/"><img src="/logo.svg" alt="PaperGradeAI" className="site-logo" height="32" width="146" /></a><div className="ms-auto d-flex gap-2"><Link className="btn btn-outline-primary" href="/login">Log in</Link><Link className="btn btn-primary" href="/signup">Check 30 papers free</Link></div></div></nav>
      <div className="container py-5">
        <p><Link href="/blog">← Back to Blog</Link></p>
        <p className="small text-muted mb-1">{article.date} · PaperGradeAI Blog</p>
        <h1>{article.title}</h1>
        <p className="lead">{article.excerpt}</p>
        {article.body.map((p, i) => (<p key={i}>{p}</p>))}
        <hr />
        <div className="card p-4 mt-4">
          <h5>Try it on your next class set</h5>
          <p className="mb-3">Grade 30 papers free. No card, no district sale.</p>
          <div><Link className="btn btn-primary" href="/signup">Check 30 papers free</Link></div>
        </div>
        <p className="mt-4"><Link href="/blog">← Back to Blog</Link> · <Link href="/">Home</Link></p>
      </div>
      <footer className="bg-white border-top py-4 no-print"><div className="container small text-muted">© 2026 PaperGradeAI. <Link href="/">Home</Link> · <Link href="/blog">Blog</Link> · <Link href="/login">Log in</Link></div></footer>
    </div>
  );
}
