// lib/billing.js — Plans. Demo checkout switches the plan with no real charge.
// For real money: Lemon Squeezy or Paddle as merchant of record (handles US sales
// tax for a Pakistan-based seller); Stripe direct only if eligible in your country.
export const PLANS = {
  free: { id: "free", name: "Free", price: 0, papersPerMonth: 30, classes: 1, blurb: "Try it on one real class set.", features: ["30 papers / month", "1 class", "MCQ + short answer", "CSV export"] },
  teacher: { id: "teacher", name: "Teacher", price: 15, priceMonthly: 19, papersPerMonth: 800, classes: 999, blurb: "For teachers who grade paper tests every week.", features: ["800 papers / month (fair-use cap)", "Unlimited classes", "Feedback PDFs (EN + ES)", "Priority processing", "Rubric library", "Class Analytics + Reteach", "Maths step grading", "Class PDF split"] },
};
export function planFor(user) { return PLANS[user?.plan] || PLANS.free; }
// Monthly cap is enforced in the papers API via papersThisMonth() from lib/db.js.
