import "./globals.css";
export const metadata = { title: "Teacher Paper Checker: Grade a class set of paper tests in 15 minutes", description: "Upload a student's solved paper (photo or PDF). Get a draft result against your answer key and rubric. Teacher approves every grade. USA teachers, $15/mo." };
export default function RootLayout({ children }) {
  return (<html lang="en"><head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head><body>{children}</body></html>);
}
