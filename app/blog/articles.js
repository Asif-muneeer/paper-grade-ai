export const ARTICLES = [
  {
    slug: "how-to-grade-a-class-set-of-paper-tests-in-15-minutes",
    title: "How to Grade a Class Set of Paper Tests in 15 Minutes",
    date: "November 11, 2026",
    excerpt: "A simple routine that turns a Sunday-night stack of papers into a finished mark sheet before your coffee gets cold.",
    body: [
      "Start with the answer key, not the papers. Before you open a single student paper, write down the correct answer for every multiple-choice question and a short model answer for every short answer. That key is what makes fast grading possible, because the checking is then a comparison, not a fresh decision for every paper.",
      "Next, photograph or scan the whole class set in one go. Put the papers in the same order as your class list, take clear photos in good light, or scan them as one PDF. A whole-class PDF can be split later, one paper per student, in name order, so you do not have to upload thirty separate files.",
      "Then let the tool do the first pass. Multiple-choice answers are matched against your key, which is a mechanical job a computer does in seconds. Short answers are scored against your rubric as a draft, and maths questions get partial credit step by step, so a student who set the problem up right but slipped on the final number still earns most of the marks.",
      "Now comes the part only a teacher can do: review the draft. Look first at the low-confidence reads, the ones the tool has flagged because the handwriting was messy or the answer was unclear. Fix those, change any mark you disagree with, and then approve. Nothing becomes final until you approve it, so the grade is always yours.",
      "Finally, share the result. Print the mark sheet for your records, export the CSV for your gradebook, and give each student feedback in plain language. If several students missed the same question, that is your reteach list for tomorrow: one short worksheet on exactly that topic, instead of re-teaching the whole chapter. Fifteen minutes, one class set, done.",
    ],
  },
  {
    slug: "mcq-vs-short-answer-how-ai-checks-each-one",
    title: "MCQ vs Short Answer: How AI Checks Each One",
    date: "November 11, 2026",
    excerpt: "Multiple choice is a match. Short answer is a judgement against a rubric. Here is how each one is checked, and where you stay in charge.",
    body: [
      "Multiple-choice questions are the easy case. The tool reads the letter the student chose and compares it with the letter in your answer key. If they match, the mark is given; if they do not, it is not. There is no guessing and no opinion involved, which is why multiple choice is scored at near 100 percent accuracy when the key is clean and the answer is legible.",
      "Fill-in-the-blank questions work the same way, with one difference: spelling and wording matter. A short expected answer, such as a word or a number, is compared with what the student wrote, and close matches are flagged for you to confirm rather than guessed.",
      "Short answers are different, because there is no single right string of words. Here the tool scores against your rubric and your model answer. It looks for the key ideas in the model answer, checks how many of them appear in the student response, and gives a draft mark with a reason. A two-point answer that names both reasons earns full marks; an answer that names one earns partial credit.",
      "Maths questions get their own treatment. The final answer is checked exactly, but the working earns marks too: setting the problem up, showing the working, and reaching the answer are scored as separate steps. That is why a student can earn four out of five marks even with a wrong final number.",
      "Handwriting is the honest limit. Clean handwriting reads well, messy handwriting reads at about 70 to 85 percent. That is why every low-confidence read is flagged in the review grid and never silently guessed. You read the flagged ones yourself, fix them, and approve. The AI does the fast first pass; you make the final call.",
    ],
  },
  {
    slug: "what-is-a-reteach-worksheet-and-when-to-use-one",
    title: "What Is a Reteach Worksheet (and When to Use One)",
    date: "November 11, 2026",
    excerpt: "When half the class misses the same question, the answer is not more homework. It is one short worksheet on exactly that topic.",
    body: [
      "A reteach worksheet is a short practice sheet built from the questions your class actually missed. Instead of re-teaching a whole chapter, you give students two or three fresh practice items on the one idea that tripped them up, with the answer key on the second page for you, not for them.",
      "You know you need one when the analytics show a pattern. If one question sits at 52 percent while the rest of the test sits at 80 percent, that question is telling you something: the class did not learn that idea, or the question tested it in a way they did not expect. A single low score is a student problem; a class-wide low score is a teaching signal.",
      "The worksheet itself should be short. Two practice items per missed question is enough. Each item should use the same idea as the original question but with different numbers or different wording, so students have to think again instead of memorising the old answer. Keep the language simple and the task focused on one skill at a time.",
      "Use it the next day, not the next week. The gap is freshest right after the test, when students still remember what they wrote and why they chose it. Ten minutes at the start of the lesson, then move on. If most students get the practice items right, the idea has landed and you can close the loop.",
      "That is the whole point of class analytics: marks tell you who passed, but most-missed questions tell you what to teach next. A reteach worksheet turns a disappointing test result into a ten-minute fix, and it is the fastest way to make the next test better than the last one.",
    ],
  },
  {
    slug: "staar-vs-ap-rubrics-which-one-should-you-pick",
    title: "STAAR vs AP Rubrics: Which One Should You Pick?",
    date: "November 11, 2026",
    excerpt: "STAAR, FSA, Regents and AP all score writing and problem-solving differently. Pick the rubric that matches the test your students will actually sit.",
    body: [
      "A rubric is only useful if it matches the test your students are preparing for. A STAAR rubric and an AP rubric both score student work, but they reward different things, and using the wrong one gives you marks that do not predict the real result.",
      "STAAR rubrics, used in Texas, are built around the state standards for each grade. They score a response against clear criteria such as organisation, development of ideas, and use of evidence, with level descriptors that tell you exactly what a top answer looks like. If your students sit STAAR, grade with STAAR, because that is the standard they will be judged against.",
      "AP rubrics, from the College Board, are different. They are shorter and sharper: a few points for a thesis, a few for evidence and commentary, and nothing for decoration. AP rewards a clear argument supported by well-chosen evidence, and it penalises summary that does not advance the argument. If your students sit an AP exam, an AP rubric is the honest mirror.",
      "Florida B.E.S.T. and New York Regents rubrics sit in the same family as STAAR: state standards, clear criteria, level descriptors. The names change, but the principle does not. Pick the rubric for the state or programme your students belong to, and do not mix them in one test.",
      "The practical rule is simple. Ask one question: which exam will these students sit at the end of the year? Use that rubric, and use it unchanged for the whole year, so your marks mean the same thing in September and in May. PaperGradeAI ships STAAR, FSA, Regents and AP rubrics ready to use, so you can pick one when you create a test instead of writing a rubric from scratch.",
    ],
  },
];

export function getArticle(slug) {
  return ARTICLES.find((a) => a.slug === slug);
}
