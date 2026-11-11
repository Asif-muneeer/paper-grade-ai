// lib/seed.js — demo data. Demo login: demo@teacherpaper.com / demo1234
// One ready-made test (Grade 7 Science, 5 questions) + 3 graded demo papers so
// the dashboard, review grid and results pages work before the first upload.
import crypto from "crypto";
import { gradePaper } from "./grading.js";
function hash(p, salt) { return crypto.scryptSync(p, salt, 64).toString("hex"); }
export function seedData() {
  const salt = "demo-salt-1234";
  const testId = "t_demo";
  const questions = [
    { id: "q1", no: 1, type: "mcq", topic: "Science", text: "Which planet is known as the Red Planet?", marks: 2, correctAnswer: "B", modelAnswer: "", rubric: "" },
    { id: "q2", no: 2, type: "mcq", topic: "Science", text: "What is the chemical symbol for water?", marks: 2, correctAnswer: "A", modelAnswer: "", rubric: "" },
    { id: "q3", no: 3, type: "fill", topic: "Science", text: "Photosynthesis takes place in the ______ of a plant cell.", marks: 2, correctAnswer: "chloroplast", modelAnswer: "", rubric: "" },
    { id: "q4", no: 4, type: "short", topic: "Science", text: "Explain why the Moon looks different over a month.", marks: 5, correctAnswer: "", modelAnswer: "The Moon orbits Earth and sunlight lights different parts of its surface as it moves, so we see changing phases.", rubric: "Mentions orbit (2), sunlight / lit part (2), phases (1)" },
    { id: "q5", no: 5, type: "short", topic: "Science", text: "Give two reasons why plants need sunlight.", marks: 4, correctAnswer: "", modelAnswer: "Plants use sunlight for photosynthesis to make food and to grow, and light energy is converted into chemical energy.", rubric: "Photosynthesis / food (2), growth / energy (2)" },
    { id: "q6", no: 6, type: "math", topic: "Maths", text: "Solve 2x + 6 = 14. Show your working.", marks: 5, correctAnswer: "x = 4", finalMarks: 1, modelAnswer: "", rubric: "STAAR Maths: setup (2), working (2), final answer (1)", steps: [
      { label: "Step 1 — Setup", marks: 2, keywords: "subtract 6 both sides 2x = 14 - 6" },
      { label: "Step 2 — Working", marks: 2, keywords: "2x = 8 divide 2" },
    ] },
  ];
  // Pre-grade the demo papers with the same rules the live grader uses.
  const mk = (id, name, sid, answers) => ({ id, testId, userId: "u_demo", studentName: name, studentId: sid, fileName: `${name.toLowerCase().replace(/ /g, "-")}-paper.jpg`, fileType: "image/jpeg", filePath: "", answers, status: "approved", grading: gradePaper({ questions }, answers), createdAt: "2026-11-10T09:00:00.000Z" });
  const papers = [
    mk("p1", "Ava Johnson", "S-101", [{ questionId: "q1", answer: "B" }, { questionId: "q2", answer: "A" }, { questionId: "q3", answer: "chloroplast" }, { questionId: "q4", answer: "The Moon orbits Earth and sunlight lights different parts of its surface as it moves, so we see changing phases." }, { questionId: "q5", answer: "Plants use sunlight for photosynthesis to make food and to grow." }, { questionId: "q6", answer: "Subtract 6 both sides 2x = 14 - 6, 2x = 8 divide 2, x = 4" }]),
    mk("p2", "Liam Smith", "S-102", [{ questionId: "q1", answer: "B" }, { questionId: "q2", answer: "C" }, { questionId: "q3", answer: "chloroplast" }, { questionId: "q4", answer: "The Moon moves around Earth." }, { questionId: "q5", answer: "For photosynthesis." }, { questionId: "q6", answer: "2x = 8" }]),
    mk("p3", "Maya Patel", "S-103", [{ questionId: "q1", answer: "A" }, { questionId: "q2", answer: "A" }, { questionId: "q3", answer: "" }, { questionId: "q4", answer: "Sunlight lights different parts of the Moon as it orbits Earth, so we see phases." }, { questionId: "q5", answer: "Plants use sunlight for photosynthesis to make food and light energy becomes chemical energy for growth." }, { questionId: "q6", answer: "Subtract 6 both sides 2x = 14 - 6, 2x = 8 divide 2, x = 5" }]),
  ];
  return {
    users: [{ id: "u_demo", name: "Demo Teacher", email: "demo@teacherpaper.com", salt, passwordHash: hash("demo1234", salt), plan: "free", createdAt: "2026-11-01T09:00:00.000Z" }],
    tests: [{ id: testId, userId: "u_demo", subject: "Grade 7 Science", className: "7B", totalMarks: 20, questions, createdAt: "2026-11-09T09:00:00.000Z" }],
    papers,
  };
}
