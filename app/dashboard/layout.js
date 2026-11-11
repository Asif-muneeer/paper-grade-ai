import Link from "next/link";
export default function DashLayout({ children }) {
  return (<div><nav className="navbar navbar-expand-lg navbar-dark bg-primary no-print"><div className="container"><Link className="navbar-brand fw-bold" href="/dashboard">📝 Paper Checker</Link><div className="ms-auto d-flex flex-wrap gap-2"><Link className="btn btn-sm btn-light" href="/dashboard">Dashboard</Link><Link className="btn btn-sm btn-light" href="/dashboard/tests">Tests</Link><Link className="btn btn-sm btn-light" href="/dashboard/billing">Billing</Link><Link className="btn btn-sm btn-light" href="/dashboard/settings">Settings</Link><a className="btn btn-sm btn-outline-light" href="/api/auth/logout">Log out</a></div></div></nav><main className="container py-4">{children}</main></div>);
}
