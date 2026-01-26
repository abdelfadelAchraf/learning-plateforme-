import { buildSchema } from "graphql";

export const schema = buildSchema(`
  # Subject Enum Type (matches your Subject type exactly)
  enum Subject {
    mathematics
    physics
    chemistry
    biology
    computerScience
    history
    geography
    languages
  }

  # Language Enum for User
  enum Language {
    fr
    en
  }

  # Question Type Enum (matches your type exactly)
  enum QuestionType {
    multiple_choice
    true_false
    short_answer
  }

  # Exam Question Type
  type ExamQuestion {
    id: ID!
    question: String!
    type: QuestionType!
    options: [String]  # Optional array
    correctAnswer: String!
    points: Int!
  }

  # Chapter Type
  type Chapter {
    id: ID!
    title: String!
    content: String!
    order: Int!
  }

  # Exercise Type
  type Exercise {
    id: ID!
    title: String!
    question: String!
    explanation: String!
    subject: Subject!
  }

  # Exam Type
  type Exam {
    id: ID!
    title: String!
    description: String!
    questions: [ExamQuestion!]!
    subject: Subject!
  }

  # Course Type
  type Course {
    id: ID!
    title: String!
    description: String!
    subject: Subject!
    chapters: [Chapter!]!
  }

  # User Type (matches your interface exactly)
  type User {
    id: ID!
    name: String!
    email: String!
    preferredLanguage: Language!
  }

  # Exam Result Type
  type ExamResult {
    examId: ID!
    score: Float!
    totalQuestions: Int!
    correctAnswers: Int!
    completedAt: String!  # GraphQL uses String for dates
    passed: Boolean!
  }

  # Input Types for Mutations
  input ChapterInput {
    title: String!
    content: String!
    order: Int!
  }

  input ExamQuestionInput {
    question: String!
    type: QuestionType!
    options: [String]
    correctAnswer: String!
    points: Int!
  }

  input ExerciseInput {
    title: String!
    question: String!
    explanation: String!
    subject: Subject!
  }

  input ExamInput {
    title: String!
    description: String!
    questions: [ExamQuestionInput!]!
    subject: Subject!
  }

  input CourseInput {
    title: String!
    description: String!
    subject: Subject!
    chapters: [ChapterInput!]!
  }

  input UserInput {
    name: String!
    email: String!
    preferredLanguage: Language!
  }

  input ExamResultInput {
    examId: ID!
    score: Float!
    totalQuestions: Int!
    correctAnswers: Int!
    completedAt: String!
    passed: Boolean!
  }

  # Query Type
  type Query {
    # User Queries
    user(id: ID!): User
    users: [User!]!
    
    # Course Queries
    courses(subject: Subject): [Course!]!
    course(id: ID!): Course
    
    # Exercise Queries
    exercises(subject: Subject): [Exercise!]!
    exercise(id: ID!): Exercise
    
    # Exam Queries
    exams(subject: Subject): [Exam!]!
    exam(id: ID!): Exam
    
    # Exam Result Queries
    examResults(userId: ID!): [ExamResult!]!
    examResult(examId: ID!, userId: ID!): ExamResult
  }

  # Mutation Type
  type Mutation {
    # User Mutations
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): Boolean!
    
    # Course Mutations
    createCourse(input: CourseInput!): Course!
    updateCourse(id: ID!, input: CourseInput!): Course!
    deleteCourse(id: ID!): Boolean!
    
    # Chapter Mutations
    addChapter(courseId: ID!, input: ChapterInput!): Chapter!
    updateChapter(courseId: ID!, chapterId: ID!, input: ChapterInput!): Chapter!
    deleteChapter(courseId: ID!, chapterId: ID!): Boolean!
    
    # Exercise Mutations
    createExercise(input: ExerciseInput!): Exercise!
    updateExercise(id: ID!, input: ExerciseInput!): Exercise!
    deleteExercise(id: ID!): Boolean!
    
    # Exam Mutations
    createExam(input: ExamInput!): Exam!
    updateExam(id: ID!, input: ExamInput!): Exam!
    deleteExam(id: ID!): Boolean!
    
    # Exam Question Mutations
    addExamQuestion(examId: ID!, input: ExamQuestionInput!): ExamQuestion!
    updateExamQuestion(examId: ID!, questionId: ID!, input: ExamQuestionInput!): ExamQuestion!
    deleteExamQuestion(examId: ID!, questionId: ID!): Boolean!
    
    # Exam Result Mutations
    submitExamResult(input: ExamResultInput!): ExamResult!
  }
`);