import { Course } from "../models/Course";
import { User } from "../models/User";
import { Exercise } from "../models/Exercise";
import { Exam } from "../models/Exam";
import { ExamResult } from "../models/ExamResult";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { AuthInput } from "../type";

// Helper functions
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

// Admin credentials from .env
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

export const root = {
  // ===== QUERY RESOLVERS =====
 login: async ({ input }: { input: AuthInput }) => {
  const { email, password } = input;
  const user = await User.findOne({ email });
  if (!user) throw new Error("Utilisateur non trouvé");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Mot de passe incorrect");

  const token = jwt.sign(
    { id: user._id, email: user.email, role: "user" },
    JWT_SECRET as string,
    { expiresIn: "24h" }
  );

  return {
    token,
    user,
  };
},


  logout: () => {
    // Dans un système plus complexe, vous pourriez invalider le token
    return true;
  },

  // Ajouter une vérification de token
  verifyToken: async ({ token }: { token: string }) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET as string) as any;
      return {
        valid: true,
        user: decoded,
      };
    } catch (error) {
      return {
        valid: false,
        error: "Token invalide ou expiré",
      };
    }
  },
  // User Queries
  user: async ({ id }: { id: string }) => {
    return await User.findById(id);
  },

  users: async () => {
    return await User.find();
  },

  // Course Queries
  courses: async ({ subject }: { subject?: string }) => {
    if (subject) {
      return await Course.find({ subject });
    }
    return await Course.find();
  },

  course: async ({ id }: { id: string }) => {
    return await Course.findById(id);
  },

  // Exercise Queries
  exercises: async ({ subject }: { subject?: string }) => {
    if (subject) {
      return await Exercise.find({ subject });
    }
    return await Exercise.find();
  },

  exercise: async ({ id }: { id: string }) => {
    return await Exercise.findById(id);
  },

  // Exam Queries
  exams: async ({ subject }: { subject?: string }) => {
    if (subject) {
      return await Exam.find({ subject });
    }
    return await Exam.find();
  },

  exam: async ({ id }: { id: string }) => {
    return await Exam.findById(id);
  },

  // Exam Result Queries
  examResults: async ({ userId }: { userId: string }) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("ID utilisateur invalide");
    }
    return await ExamResult.find({
      userId: new mongoose.Types.ObjectId(userId),
    });
  },

  examResult: async ({
    examId,
    userId,
  }: {
    examId: string;
    userId: string;
  }) => {
    if (
      !mongoose.Types.ObjectId.isValid(examId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      throw new Error("ID invalide");
    }
    return await ExamResult.findOne({
      examId: new mongoose.Types.ObjectId(examId),
      userId: new mongoose.Types.ObjectId(userId),
    });
  },

  // ===== MUTATION RESOLVERS =====

  // User Mutations
  createUser: async ({ input }: { input: any }) => {
  // Hash the password
  const hashedPassword = await bcrypt.hash(input.password, 10);

  const user = new User({
    ...input,
    password: hashedPassword,
  });

  return await user.save();
},

  updateUser: async ({ id, input }: { id: string; input: any }) => {
    if (input.password) {
      input.password = await bcrypt.hash(input.password, 10);
    }
    return await User.findByIdAndUpdate(id, input, { new: true });
  },

  deleteUser: async ({ id }: { id: string }) => {
    const result = await User.findByIdAndDelete(id);
    return !!result;
  },

  // Course Mutations
  createCourse: async ({ input }: { input: any }) => {
    const course = new Course(input);
    return await course.save();
  },

  updateCourse: async ({ id, input }: { id: string; input: any }) => {
    return await Course.findByIdAndUpdate(id, input, { new: true });
  },

  deleteCourse: async ({ id }: { id: string }) => {
    const result = await Course.findByIdAndDelete(id);
    return !!result;
  },

  // Chapter Mutations
  addChapter: async ({ courseId, input }: { courseId: string; input: any }) => {
    const course = await Course.findById(courseId);
    if (!course) throw new Error("Cours non trouvé");

    course.chapters.push(input);
    await course.save();
    return course.chapters[course.chapters.length - 1];
  },

  updateChapter: async ({
    courseId,
    chapterId,
    input,
  }: {
    courseId: string;
    chapterId: string;
    input: any;
  }) => {
    const course = await Course.findById(courseId);
    if (!course) throw new Error("Cours non trouvé");

    const chapterIndex = course.chapters.findIndex(
      (ch: any) => ch._id.toString() === chapterId,
    );

    if (chapterIndex === -1) throw new Error("Chapitre non trouvé");

    course.chapters[chapterIndex] = {
      ...course.chapters[chapterIndex].toObject(),
      ...input,
    };

    await course.save();
    return course.chapters[chapterIndex];
  },

  deleteChapter: async ({
    courseId,
    chapterId,
  }: {
    courseId: string;
    chapterId: string;
  }) => {
    const course = await Course.findById(courseId);
    if (!course) throw new Error("Cours non trouvé");

    const initialLength = course.chapters.length;
    course.chapters = course.chapters.filter(
      (ch: any) => ch._id.toString() !== chapterId,
    );

    if (course.chapters.length < initialLength) {
      await course.save();
      return true;
    }
    return false;
  },

  // Exercise Mutations
  createExercise: async ({ input }: { input: any }) => {
    const exercise = new Exercise(input);
    return await exercise.save();
  },

  updateExercise: async ({ id, input }: { id: string; input: any }) => {
    return await Exercise.findByIdAndUpdate(id, input, { new: true });
  },

  deleteExercise: async ({ id }: { id: string }) => {
    const result = await Exercise.findByIdAndDelete(id);
    return !!result;
  },

  // Exam Mutations
  createExam: async ({ input }: { input: any }) => {
    const exam = new Exam({
      ...input,
      questions: input.questions.map((q: any) => ({
        ...q,
        type: convertQuestionType(q.type),
      })),
    });

    const savedExam = await exam.save();

    return {
      ...savedExam.toObject(),
      questions: savedExam.questions.map((q: any) => ({
        ...q.toObject(),
        type: convertToGraphQLType(q.type),
      })),
    };
  },

  updateExam: async ({ id, input }: { id: string; input: any }) => {
    const exam = await Exam.findById(id);
    if (!exam) throw new Error("Examen non trouvé");

    exam.title = input.title;
    exam.description = input.description;
    exam.subject = input.subject;
    exam.questions = input.questions.map((q: any) => ({
      ...q,
      type: convertQuestionType(q.type),
    }));

    await exam.save();

    return {
      ...exam.toObject(),
      questions: exam.questions.map((q: any) => ({
        ...q.toObject(),
        type: convertToGraphQLType(q.type),
      })),
    };
  },

  deleteExam: async ({ id }: { id: string }) => {
    const result = await Exam.findByIdAndDelete(id);
    return !!result;
  },

  // Exam Question Mutations
  addExamQuestion: async ({
    examId,
    input,
  }: {
    examId: string;
    input: any;
  }) => {
    const exam = await Exam.findById(examId);
    if (!exam) throw new Error("Examen non trouvé");

    const newQuestion = {
      ...input,
      type: convertQuestionType(input.type),
    };

    exam.questions.push(newQuestion);
    await exam.save();

    const addedQuestion = exam.questions[exam.questions.length - 1];

    return {
      ...addedQuestion.toObject(),
      type: convertToGraphQLType(addedQuestion.type),
    };
  },

  updateExamQuestion: async ({
    examId,
    questionId,
    input,
  }: {
    examId: string;
    questionId: string;
    input: any;
  }) => {
    const exam = await Exam.findById(examId);
    if (!exam) throw new Error("Examen non trouvé");

    const questionIndex = exam.questions.findIndex(
      (q: any) => q._id.toString() === questionId,
    );

    if (questionIndex === -1) throw new Error("Question non trouvée");

    exam.questions[questionIndex] = {
      ...exam.questions[questionIndex].toObject(),
      ...input,
      type: convertQuestionType(input.type),
    };

    await exam.save();

    return {
      ...exam.questions[questionIndex].toObject(),
      type: convertToGraphQLType(exam.questions[questionIndex].type),
    };
  },

  deleteExamQuestion: async ({
    examId,
    questionId,
  }: {
    examId: string;
    questionId: string;
  }) => {
    const exam = await Exam.findById(examId);
    if (!exam) throw new Error("Examen non trouvé");

    const initialLength = exam.questions.length;
    exam.questions = exam.questions.filter(
      (q: any) => q._id.toString() !== questionId,
    );

    if (exam.questions.length < initialLength) {
      await exam.save();
      return true;
    }
    return false;
  },

  // Exam Result Mutation
  submitExamResult: async ({ input }: { input: any }) => {
    const examResult = new ExamResult({
      ...input,
      userId: new mongoose.Types.ObjectId(input.userId),
      examId: new mongoose.Types.ObjectId(input.examId),
      completedAt: new Date(input.completedAt || Date.now()),
    });

    return await examResult.save();
  },
};
