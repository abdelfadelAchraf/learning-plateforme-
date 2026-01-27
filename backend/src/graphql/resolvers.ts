// Import types from your interfaces
import {
  User,
  Course,
  Chapter,
  Exercise,
  Exam,
  ExamQuestion,
  ExamResult,
  Subject,
} from "../type";

// Sample data (in-memory database)
let users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    preferredLanguage: "en",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    preferredLanguage: "fr",
  },
];

let courses: Course[] = [
 {
    id: "1",

    title: "Cours complet : Résolution des intégrales $$\\int f(x)dx$$",

    description:
      "Un cours progressif pour apprendre à calculer les intégrales : primitives, méthodes, techniques avancées et applications.",

    subject: "mathematics",

    chapters: [
     
      {
        id: "int-1",
        title: "Introduction aux intégrales",

        content: `
## Qu'est-ce qu'une intégrale ?

Une intégrale représente **l’aire sous une courbe**.

$$
\\int_a^b f(x) dx
$$

Elle mesure la surface comprise entre la courbe et l'axe des abscisses.

---

## Primitive

Une fonction $F$ est une primitive de $f$ si :

$$
F'(x) = f(x)
$$

---

## Théorème fondamental

$$
\\int_a^b f(x) dx = F(b) - F(a)
$$
        `,
        order: 1,
      },

    
      {
        id: "int-2",
        title: "Règles de calcul des primitives",

        content: `
## Linéarité

$$
\\int (af(x) + bg(x)) dx = a \\int f(x)dx + b \\int g(x)dx
$$

---

## Puissances

$$
\\int x^n dx = \\frac{x^{n+1}}{n+1} + C
$$

Exemple :

$$
\\int x^2 dx = \\frac{x^3}{3}
$$

---

## Constante

$$
\\int k dx = kx
$$
        `,
        order: 2,
      },

  
      {
        id: "int-3",
        title: "Intégrales usuelles à connaître",

        content: `
Ces formules doivent être **connues par cœur**.

$$
\\int e^x dx = e^x
$$

$$
\\int \\frac{1}{x} dx = \\ln |x|
$$

$$
\\int \\sin x dx = -\\cos x
$$

$$
\\int \\cos x dx = \\sin x
$$

$$
\\int \\frac{1}{1+x^2} dx = \\arctan x
$$
        `,
        order: 3,
      },

   
      {
        id: "int-4",
        title: "Méthode de substitution (changement de variable)",

        content: `
## Idée

Simplifier une intégrale compliquée.

Si :

$$
u = g(x)
$$

Alors :

$$
du = g'(x) dx
$$

---

## Exemple

Calculer :

$$
\\int 2x \\cos(x^2) dx
$$

Posons :

$$
u = x^2
$$

Alors :

$$
du = 2x dx
$$

On obtient :

$$
\\int \\cos(u) du = \\sin(u)
$$

Résultat :

$$
\\boxed{\\sin(x^2) + C}
$$
        `,
        order: 4,
      },

    
      {
        id: "int-5",
        title: "Intégration par parties",

        content: `
## Formule

$$
\\int u dv = uv - \\int v du
$$

---

## Exemple

Calculer :

$$
\\int x e^x dx
$$

Choix :

$$
u = x, \\quad dv = e^x dx
$$

Alors :

$$
du = dx, \\quad v = e^x
$$

Application :

$$
xe^x - \\int e^x dx
$$

Résultat :

$$
\\boxed{xe^x - e^x + C}
$$
        `,
        order: 5,
      },

   
      {
        id: "int-6",
        title: "Applications géométriques : aire sous la courbe",

        content: `
## Aire

L'aire sous une courbe est donnée par :

$$
A = \\int_a^b f(x) dx
$$

---

## Exemple

$$
\\int_0^1 x^2 dx
$$

Primitive :

$$
\\frac{x^3}{3}
$$

Calcul :

$$
\\left[ \\frac{x^3}{3} \\right]_0^1
$$

Résultat :

$$
\\boxed{\\frac{1}{3}}
$$
        `,
        order: 6,
      },

   
      {
        id: "int-7",
        title: "Exercices corrigés",

        content: `
## Exercice 1

$$
\\int 3x^2 dx
$$

Solution :

$$
x^3 + C
$$

---

## Exercice 2

$$
\\int \\frac{2x}{1+x^2} dx
$$

Substitution :

$$
u = 1+x^2
$$

Résultat :

$$
\\ln(1+x^2) + C
$$

---

## Exercice 3

$$
\\int x \\ln x dx
$$

(par parties)

Résultat :

$$
\\boxed{\\frac{x^2}{2} \\ln x - \\frac{x^2}{4} + C}
$$
        `,
        order: 7,
      },
    ],
  },
  {
    id: "2",
    title: "Physics 101",
    description: "Introduction to physics",
    subject: "physics",
    chapters: [
      {
        id: "2-1",
        title: "Newton's Laws",
        content: "The three laws of motion",
        order: 1,
      },
    ],
  },
  {
    id: "3",
    title: "Mathematics Basics",
    description: "Learn algebra, equations, and functions",
    subject: "mathematics",
    chapters: [
      {
        id: "3-1",
        title: "Algebra Essentials",
        content: "Variables, equations and solving problems",
        order: 1,
      },
      {
        id: "3-2",
        title: "Functions",
        content: "Understanding graphs and functions",
        order: 2,
      },
    ],
  },
  {
    id: "4",
    title: "Physics 101",
    description: "Introduction to motion and energy",
    subject: "physics",
    chapters: [
      {
        id: "4-1",
        title: "Newton's Laws",
        content: "The three laws of motion",
        order: 1,
      },
      {
        id: "4-2",
        title: "Energy",
        content: "Kinetic and potential energy explained",
        order: 2,
      },
    ],
  },
  {
    id: "5",
    title: "Chemistry Fundamentals",
    description: "Atoms, molecules and reactions",
    subject: "chemistry",
    chapters: [
      {
        id: "5-1",
        title: "Atomic Structure",
        content: "Protons, neutrons, electrons",
        order: 1,
      },
      {
        id: "5-2",
        title: "Chemical Bonds",
        content: "Ionic and covalent bonds",
        order: 2,
      },
    ],
  },
 {
  id: "6",
  title: "Introduction to Python Programming",
  description: "Learn Python from scratch: variables, functions, loops, and more.",
  subject: "computerScience",
  chapters: [
    {
      id: "py-1",
      title: "Introduction to Python",
      content: `
Python is a high-level, interpreted programming language known for its readability and versatility.

You will learn how to install Python, use the interactive shell, and write your first program.

\`\`\`python
# Example:
print("Hello, World!")
\`\`\`

By the end of this chapter, you should be able to run Python code and understand basic syntax.
      `,
      order: 1
    },
    {
      id: "py-2",
      title: "Variables and Data Types",
      content: `
Variables are containers for storing data. Python automatically detects the type of data you assign.

Common data types:
- int – integers, e.g., 42
- float – decimal numbers, e.g., 3.14
- str – strings, e.g., "Python"
- bool – True or False
- list – ordered collections, e.g., [1, 2, 3]
- dict – key-value pairs, e.g., {"name": "Alice"}

\`\`\`python
# Example:
age = 18
name = "John"
is_student = True
\`\`\`

Python allows dynamic typing: a variable can change type during execution.
      `,
      order: 2
    },
    {
      id: "py-3",
      title: "Control Flow: Conditions and Loops",
      content: `
Control flow lets your program make decisions and repeat actions.

Conditional statements:

\`\`\`python
if age >= 18:
    print("Adult")
else:
    print("Minor")
\`\`\`

Loops:

\`\`\`python
for i in range(5):
    print(i)

count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

Use loops and conditions together to solve problems efficiently.
      `,
      order: 3
    },
    {
      id: "py-4",
      title: "Functions",
      content: `
Functions group reusable code. They improve readability and modularity.

Defining a function:

\`\`\`python
def greet(name):
    return "Hello " + name
\`\`\`

Calling a function:

\`\`\`python
message = greet("Alice")
print(message)
\`\`\`

Functions can take multiple arguments and return values. They help structure programs professionally.
      `,
      order: 4
    },
    {
      id: "py-5",
      title: "Modules and Libraries",
      content: `
Python has a rich ecosystem of modules and libraries to extend functionality.

Importing modules:

\`\`\`python
import math
print(math.sqrt(16))
\`\`\`

Using libraries:

\`\`\`python
import random
print(random.randint(1, 10))
\`\`\`

Libraries allow you to work with files, web requests, data analysis, and more.
      `,
      order: 5
    },
    {
      id: "py-6",
      title: "Lists and Dictionaries",
      content: `
Lists are ordered collections:

\`\`\`python
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")
print(fruits[0])
\`\`\`

Dictionaries store key-value pairs:

\`\`\`python
student = {"name": "Alice", "age": 20}
print(student["name"])
\`\`\`

You can loop through lists and dictionaries to process data efficiently.
      `,
      order: 6
    },
    {
      id: "py-7",
      title: "Practical Exercises",
      content: `
1. Create a program that asks the user for their name and age, then prints a greeting.

\`\`\`python
name = input("Enter your name: ")
age = int(input("Enter your age: "))
print(f"Hello {name}, you are {age} years old!")
\`\`\`

2. Write a function that returns the factorial of a number.

\`\`\`python
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n-1)
\`\`\`

3. Create a list of numbers and use a loop to print only the even ones.

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6]
for n in numbers:
    if n % 2 == 0:
        print(n)
\`\`\`

4. Use a dictionary to store student names and grades, then print the students with grades above 15.

\`\`\`python
grades = {"Alice": 16, "Bob": 14, "Charlie": 18}
for student, grade in grades.items():
    if grade > 15:
        print(student, grade)
\`\`\`

5. Combine functions and loops to create a small menu-driven program.

By completing these exercises, you'll be ready to write your first Python projects.
      `,
      order: 7
    }
  ]
}


];

let exercises: Exercise[] = [
  {
    id: "1",
    title: "Algebra Practice",
    question: "Solve for x: 2x + 5 = 15",
    explanation: "Subtract 5 from both sides, then divide by 2",
    subject: "mathematics",
  },
  {
    id: "2",
    title: "Physics Quiz",
    question: "What is the formula for force?",
    explanation: "Force = mass × acceleration (F=ma)",
    subject: "physics",
  },
];

let exams: Exam[] = [
  {
    id: "1",
    title: "Mathematics Midterm",
    description: "Midterm exam covering algebra and geometry",
    questions: [
      {
        id: "1-1",
        question: "What is 2 + 2?",
        type: "multiple-choice",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4",
        points: 10,
      },
      {
        id: "1-2",
        question: "A triangle has 3 sides",
        type: "true-false",
        correctAnswer: "true",
        points: 5,
      },
    ],
    subject: "mathematics",
  },
];

let examResults: ExamResult[] = [
  {
    examId: "1",
    score: 85.5,
    totalQuestions: 2,
    correctAnswers: 2,
    completedAt: new Date("2024-01-15T10:30:00Z"),
    passed: true,
  },
];

// Helper functions for ID generation
const generateId = () => Math.random().toString(36).substr(2, 9);

// Type conversion helpers
const convertQuestionType = (
  type: string,
): "multiple-choice" | "true-false" | "short-answer" => {
  switch (type) {
    case "multiple_choice":
      return "multiple-choice";
    case "true_false":
      return "true-false";
    case "short_answer":
      return "short-answer";
    default:
      return "multiple-choice";
  }
};

const convertToGraphQLType = (
  type: "multiple-choice" | "true-false" | "short-answer",
) => {
  switch (type) {
    case "multiple-choice":
      return "multiple_choice";
    case "true-false":
      return "true_false";
    case "short-answer":
      return "short_answer";
  }
};

// Resolvers
export const root = {
  // ===== QUERY RESOLVERS =====

  // User Queries
  user: ({ id }: { id: string }) => users.find((u) => u.id === id),
  users: () => users,

  // Course Queries
  courses: ({ subject }: { subject?: Subject }) => {
    if (subject) return courses.filter((c) => c.subject === subject);
    return courses;
  },
  course: ({ id }: { id: string }) => courses.find((c) => c.id === id),

  // Exercise Queries
  exercises: ({ subject }: { subject?: Subject }) => {
    if (subject) return exercises.filter((e) => e.subject === subject);
    return exercises;
  },
  exercise: ({ id }: { id: string }) => exercises.find((e) => e.id === id),

  // Exam Queries
  exams: ({ subject }: { subject?: Subject }) => {
    if (subject) return exams.filter((e) => e.subject === subject);
    return exams;
  },
  exam: ({ id }: { id: string }) => exams.find((e) => e.id === id),

  // Exam Result Queries
  examResults: ({ userId }: { userId: string }) => {
    // For simplicity, returning all results. In real app, filter by userId
    return examResults.map((result) => ({
      ...result,
      completedAt: result.completedAt.toISOString(),
    }));
  },
  examResult: ({ examId, userId }: { examId: string; userId: string }) => {
    const result = examResults.find((r) => r.examId === examId);
    if (!result) return null;
    return {
      ...result,
      completedAt: result.completedAt.toISOString(),
    };
  },

  // ===== MUTATION RESOLVERS =====

  // User Mutations
  createUser: ({ input }: { input: any }) => {
    const newUser: User = {
      id: generateId(),
      name: input.name,
      email: input.email,
      preferredLanguage: input.preferredLanguage,
    };

    users.push(newUser);
    return newUser;
  },

  updateUser: ({ id, input }: { id: string; input: any }) => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error("User not found");

    users[index] = { ...users[index], ...input };
    return users[index];
  },

  deleteUser: ({ id }: { id: string }) => {
    const initialLength = users.length;
    users = users.filter((u) => u.id !== id);
    return users.length < initialLength;
  },

  // Course Mutations
  createCourse: ({ input }: { input: any }) => {
    const chaptersWithIds = input.chapters.map(
      (chapter: any, index: number) => ({
        id: generateId(),
        ...chapter,
      }),
    );

    const newCourse: Course = {
      id: generateId(),
      title: input.title,
      description: input.description,
      subject: input.subject,
      chapters: chaptersWithIds,
    };

    courses.push(newCourse);
    return newCourse;
  },

  updateCourse: ({ id, input }: { id: string; input: any }) => {
    const index = courses.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Course not found");

    courses[index] = {
      ...courses[index],
      title: input.title,
      description: input.description,
      subject: input.subject,
      chapters: input.chapters.map((chapter: any) => ({
        id: chapter.id || generateId(),
        ...chapter,
      })),
    };

    return courses[index];
  },

  deleteCourse: ({ id }: { id: string }) => {
    const initialLength = courses.length;
    courses = courses.filter((c) => c.id !== id);
    return courses.length < initialLength;
  },

  // Chapter Mutations
  addChapter: ({ courseId, input }: { courseId: string; input: any }) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) throw new Error("Course not found");

    const newChapter: Chapter = {
      id: generateId(),
      title: input.title,
      content: input.content,
      order: input.order,
    };

    course.chapters.push(newChapter);
    return newChapter;
  },

  updateChapter: ({
    courseId,
    chapterId,
    input,
  }: {
    courseId: string;
    chapterId: string;
    input: any;
  }) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) throw new Error("Course not found");

    const chapterIndex = course.chapters.findIndex((ch) => ch.id === chapterId);
    if (chapterIndex === -1) throw new Error("Chapter not found");

    course.chapters[chapterIndex] = {
      ...course.chapters[chapterIndex],
      ...input,
    };

    return course.chapters[chapterIndex];
  },

  deleteChapter: ({
    courseId,
    chapterId,
  }: {
    courseId: string;
    chapterId: string;
  }) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return false;

    const initialLength = course.chapters.length;
    course.chapters = course.chapters.filter((ch) => ch.id !== chapterId);
    return course.chapters.length < initialLength;
  },

  // Exercise Mutations
  createExercise: ({ input }: { input: any }) => {
    const newExercise: Exercise = {
      id: generateId(),
      title: input.title,
      question: input.question,
      explanation: input.explanation,
      subject: input.subject,
    };

    exercises.push(newExercise);
    return newExercise;
  },

  updateExercise: ({ id, input }: { id: string; input: any }) => {
    const index = exercises.findIndex((e) => e.id === id);
    if (index === -1) throw new Error("Exercise not found");

    exercises[index] = { ...exercises[index], ...input };
    return exercises[index];
  },

  deleteExercise: ({ id }: { id: string }) => {
    const initialLength = exercises.length;
    exercises = exercises.filter((e) => e.id !== id);
    return exercises.length < initialLength;
  },

  // Exam Mutations
  createExam: ({ input }: { input: any }) => {
    const questionsWithIds = input.questions.map((q: any, index: number) => ({
      id: generateId(),
      question: q.question,
      type: convertQuestionType(q.type),
      options: q.options || [],
      correctAnswer: q.correctAnswer,
      points: q.points,
    }));

    const newExam: Exam = {
      id: generateId(),
      title: input.title,
      description: input.description,
      questions: questionsWithIds,
      subject: input.subject,
    };

    exams.push(newExam);
    return {
      ...newExam,
      questions: newExam.questions.map((q) => ({
        ...q,
        type: convertToGraphQLType(q.type),
      })),
    };
  },

  updateExam: ({ id, input }: { id: string; input: any }) => {
    const index = exams.findIndex((e) => e.id === id);
    if (index === -1) throw new Error("Exam not found");

    exams[index] = {
      ...exams[index],
      title: input.title,
      description: input.description,
      subject: input.subject,
      questions: input.questions.map((q: any) => ({
        id: q.id || generateId(),
        question: q.question,
        type: convertQuestionType(q.type),
        options: q.options || [],
        correctAnswer: q.correctAnswer,
        points: q.points,
      })),
    };

    return {
      ...exams[index],
      questions: exams[index].questions.map((q) => ({
        ...q,
        type: convertToGraphQLType(q.type),
      })),
    };
  },

  deleteExam: ({ id }: { id: string }) => {
    const initialLength = exams.length;
    exams = exams.filter((e) => e.id !== id);
    return exams.length < initialLength;
  },

  // Exam Question Mutations
  addExamQuestion: ({ examId, input }: { examId: string; input: any }) => {
    const exam = exams.find((e) => e.id === examId);
    if (!exam) throw new Error("Exam not found");

    const newQuestion: ExamQuestion = {
      id: generateId(),
      question: input.question,
      type: convertQuestionType(input.type),
      options: input.options || [],
      correctAnswer: input.correctAnswer,
      points: input.points,
    };

    exam.questions.push(newQuestion);

    return {
      ...newQuestion,
      type: convertToGraphQLType(newQuestion.type),
    };
  },

  updateExamQuestion: ({
    examId,
    questionId,
    input,
  }: {
    examId: string;
    questionId: string;
    input: any;
  }) => {
    const exam = exams.find((e) => e.id === examId);
    if (!exam) throw new Error("Exam not found");

    const questionIndex = exam.questions.findIndex((q) => q.id === questionId);
    if (questionIndex === -1) throw new Error("Question not found");

    exam.questions[questionIndex] = {
      ...exam.questions[questionIndex],
      question: input.question,
      type: convertQuestionType(input.type),
      options: input.options || [],
      correctAnswer: input.correctAnswer,
      points: input.points,
    };

    return {
      ...exam.questions[questionIndex],
      type: convertToGraphQLType(exam.questions[questionIndex].type),
    };
  },

  deleteExamQuestion: ({
    examId,
    questionId,
  }: {
    examId: string;
    questionId: string;
  }) => {
    const exam = exams.find((e) => e.id === examId);
    if (!exam) return false;

    const initialLength = exam.questions.length;
    exam.questions = exam.questions.filter((q) => q.id !== questionId);
    return exam.questions.length < initialLength;
  },

  // Exam Result Mutation
  submitExamResult: ({ input }: { input: any }) => {
    const newExamResult: ExamResult = {
      examId: input.examId,
      score: input.score,
      totalQuestions: input.totalQuestions,
      correctAnswers: input.correctAnswers,
      completedAt: new Date(input.completedAt || new Date()),
      passed: input.passed,
    };

    examResults.push(newExamResult);

    return {
      ...newExamResult,
      completedAt: newExamResult.completedAt.toISOString(),
    };
  },
};
