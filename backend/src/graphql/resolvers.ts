// Import types from your interfaces
import { 
  User, Course, Chapter, Exercise, Exam, ExamQuestion, ExamResult, Subject 
} from "../type";



// Sample data (in-memory database)
let users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    preferredLanguage: 'en'
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    preferredLanguage: 'fr'
  }
];

let courses: Course[] = [
  {
    id: "1",
    title: "Introduction to Mathematics",
    description: "Basic math concepts",
    subject: 'mathematics',
    chapters: [
      {
        id: "1-1",
        title: "Algebra Basics",
        content: "Introduction to algebraic expressions",
        order: 1
      },
      {
        id: "1-2",
        title: "Geometry Fundamentals",
        content: "Basic geometric shapes and formulas",
        order: 2
      }
    ]
  },
  {
    id: "2",
    title: "Physics 101",
    description: "Introduction to physics",
    subject: 'physics',
    chapters: [
      {
        id: "2-1",
        title: "Newton's Laws",
        content: "The three laws of motion",
        order: 1
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
    subject: 'mathematics'
  },
  {
    id: "2",
    title: "Physics Quiz",
    question: "What is the formula for force?",
    explanation: "Force = mass × acceleration (F=ma)",
    subject: 'physics'
  }
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
        type: 'multiple-choice',
        options: ["3", "4", "5", "6"],
        correctAnswer: "4",
        points: 10
      },
      {
        id: "1-2",
        question: "A triangle has 3 sides",
        type: 'true-false',
        correctAnswer: "true",
        points: 5
      }
    ],
    subject: 'mathematics'
  }
];

let examResults: ExamResult[] = [
  {
    examId: "1",
    score: 85.5,
    totalQuestions: 2,
    correctAnswers: 2,
    completedAt: new Date("2024-01-15T10:30:00Z"),
    passed: true
  }
];

// Helper functions for ID generation
const generateId = () => Math.random().toString(36).substr(2, 9);

// Type conversion helpers
const convertQuestionType = (type: string): 'multiple-choice' | 'true-false' | 'short-answer' => {
  switch(type) {
    case 'multiple_choice': return 'multiple-choice';
    case 'true_false': return 'true-false';
    case 'short_answer': return 'short-answer';
    default: return 'multiple-choice';
  }
};

const convertToGraphQLType = (type: 'multiple-choice' | 'true-false' | 'short-answer') => {
  switch(type) {
    case 'multiple-choice': return 'multiple_choice';
    case 'true-false': return 'true_false';
    case 'short-answer': return 'short_answer';
  }
};

// Resolvers
export const root = {
  // ===== QUERY RESOLVERS =====
  
  // User Queries
  user: ({ id }: { id: string }) => users.find(u => u.id === id),
  users: () => users,
  
  // Course Queries
  courses: ({ subject }: { subject?: Subject }) => {
    if (subject) return courses.filter(c => c.subject === subject);
    return courses;
  },
  course: ({ id }: { id: string }) => courses.find(c => c.id === id),
  
  // Exercise Queries
  exercises: ({ subject }: { subject?: Subject }) => {
    if (subject) return exercises.filter(e => e.subject === subject);
    return exercises;
  },
  exercise: ({ id }: { id: string }) => exercises.find(e => e.id === id),
  
  // Exam Queries
  exams: ({ subject }: { subject?: Subject }) => {
    if (subject) return exams.filter(e => e.subject === subject);
    return exams;
  },
  exam: ({ id }: { id: string }) => exams.find(e => e.id === id),
  
  // Exam Result Queries
  examResults: ({ userId }: { userId: string }) => {
    // For simplicity, returning all results. In real app, filter by userId
    return examResults.map(result => ({
      ...result,
      completedAt: result.completedAt.toISOString()
    }));
  },
  examResult: ({ examId, userId }: { examId: string, userId: string }) => {
    const result = examResults.find(r => r.examId === examId);
    if (!result) return null;
    return {
      ...result,
      completedAt: result.completedAt.toISOString()
    };
  },
  
  // ===== MUTATION RESOLVERS =====
  
  // User Mutations
  createUser: ({ input }: { input: any }) => {
    const newUser: User = {
      id: generateId(),
      name: input.name,
      email: input.email,
      preferredLanguage: input.preferredLanguage
    };
   
    users.push(newUser);
    return newUser;
  },
  
  updateUser: ({ id, input }: { id: string, input: any }) => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error("User not found");
    
    users[index] = { ...users[index], ...input };
    return users[index];
  },
  
  deleteUser: ({ id }: { id: string }) => {
    const initialLength = users.length;
    users = users.filter(u => u.id !== id);
    return users.length < initialLength;
  },
  
  // Course Mutations
  createCourse: ({ input }: { input: any }) => {
    const chaptersWithIds = input.chapters.map((chapter: any, index: number) => ({
      id: generateId(),
      ...chapter
    }));
    
    const newCourse: Course = {
      id: generateId(),
      title: input.title,
      description: input.description,
      subject: input.subject,
      chapters: chaptersWithIds
    };
    
    courses.push(newCourse);
    return newCourse;
  },
  
  updateCourse: ({ id, input }: { id: string, input: any }) => {
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) throw new Error("Course not found");
    
    courses[index] = {
      ...courses[index],
      title: input.title,
      description: input.description,
      subject: input.subject,
      chapters: input.chapters.map((chapter: any) => ({
        id: chapter.id || generateId(),
        ...chapter
      }))
    };
    
    return courses[index];
  },
  
  deleteCourse: ({ id }: { id: string }) => {
    const initialLength = courses.length;
    courses = courses.filter(c => c.id !== id);
    return courses.length < initialLength;
  },
  
  // Chapter Mutations
  addChapter: ({ courseId, input }: { courseId: string, input: any }) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) throw new Error("Course not found");
    
    const newChapter: Chapter = {
      id: generateId(),
      title: input.title,
      content: input.content,
      order: input.order
    };
    
    course.chapters.push(newChapter);
    return newChapter;
  },
  
  updateChapter: ({ courseId, chapterId, input }: { courseId: string, chapterId: string, input: any }) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) throw new Error("Course not found");
    
    const chapterIndex = course.chapters.findIndex(ch => ch.id === chapterId);
    if (chapterIndex === -1) throw new Error("Chapter not found");
    
    course.chapters[chapterIndex] = {
      ...course.chapters[chapterIndex],
      ...input
    };
    
    return course.chapters[chapterIndex];
  },
  
  deleteChapter: ({ courseId, chapterId }: { courseId: string, chapterId: string }) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return false;
    
    const initialLength = course.chapters.length;
    course.chapters = course.chapters.filter(ch => ch.id !== chapterId);
    return course.chapters.length < initialLength;
  },
  
  // Exercise Mutations
  createExercise: ({ input }: { input: any }) => {
    const newExercise: Exercise = {
      id: generateId(),
      title: input.title,
      question: input.question,
      explanation: input.explanation,
      subject: input.subject
    };
    
    exercises.push(newExercise);
    return newExercise;
  },
  
  updateExercise: ({ id, input }: { id: string, input: any }) => {
    const index = exercises.findIndex(e => e.id === id);
    if (index === -1) throw new Error("Exercise not found");
    
    exercises[index] = { ...exercises[index], ...input };
    return exercises[index];
  },
  
  deleteExercise: ({ id }: { id: string }) => {
    const initialLength = exercises.length;
    exercises = exercises.filter(e => e.id !== id);
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
      points: q.points
    }));
    
    const newExam: Exam = {
      id: generateId(),
      title: input.title,
      description: input.description,
      questions: questionsWithIds,
      subject: input.subject
    };
    
    exams.push(newExam);
    return {
      ...newExam,
      questions: newExam.questions.map(q => ({
        ...q,
        type: convertToGraphQLType(q.type)
      }))
    };
  },
  
  updateExam: ({ id, input }: { id: string, input: any }) => {
    const index = exams.findIndex(e => e.id === id);
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
        points: q.points
      }))
    };
    
    return {
      ...exams[index],
      questions: exams[index].questions.map(q => ({
        ...q,
        type: convertToGraphQLType(q.type)
      }))
    };
  },
  
  deleteExam: ({ id }: { id: string }) => {
    const initialLength = exams.length;
    exams = exams.filter(e => e.id !== id);
    return exams.length < initialLength;
  },
  
  // Exam Question Mutations
  addExamQuestion: ({ examId, input }: { examId: string, input: any }) => {
    const exam = exams.find(e => e.id === examId);
    if (!exam) throw new Error("Exam not found");
    
    const newQuestion: ExamQuestion = {
      id: generateId(),
      question: input.question,
      type: convertQuestionType(input.type),
      options: input.options || [],
      correctAnswer: input.correctAnswer,
      points: input.points
    };
    
    exam.questions.push(newQuestion);
    
    return {
      ...newQuestion,
      type: convertToGraphQLType(newQuestion.type)
    };
  },
  
  updateExamQuestion: ({ examId, questionId, input }: { examId: string, questionId: string, input: any }) => {
    const exam = exams.find(e => e.id === examId);
    if (!exam) throw new Error("Exam not found");
    
    const questionIndex = exam.questions.findIndex(q => q.id === questionId);
    if (questionIndex === -1) throw new Error("Question not found");
    
    exam.questions[questionIndex] = {
      ...exam.questions[questionIndex],
      question: input.question,
      type: convertQuestionType(input.type),
      options: input.options || [],
      correctAnswer: input.correctAnswer,
      points: input.points
    };
    
    return {
      ...exam.questions[questionIndex],
      type: convertToGraphQLType(exam.questions[questionIndex].type)
    };
  },
  
  deleteExamQuestion: ({ examId, questionId }: { examId: string, questionId: string }) => {
    const exam = exams.find(e => e.id === examId);
    if (!exam) return false;
    
    const initialLength = exam.questions.length;
    exam.questions = exam.questions.filter(q => q.id !== questionId);
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
      passed: input.passed
    };
    
    examResults.push(newExamResult);
    
    return {
      ...newExamResult,
      completedAt: newExamResult.completedAt.toISOString()
    };
  }
};