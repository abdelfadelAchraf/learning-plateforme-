import { gql } from '@apollo/client';

export const CREATE_EXAM = gql`
  mutation CreateExam($input: ExamInput!) {
    createExam(input: $input) {
      id
      title
      description
      subject
      questions {
        id
        question
        type
        options
        correctAnswer
        points
      }
    }
  }
`;

export const UPDATE_EXAM = gql`
  mutation UpdateExam($id: ID!, $input: ExamInput!) {
    updateExam(id: $id, input: $input) {
      id
      title
      description
      subject
      questions {
        id
        question
        type
        options
        correctAnswer
        points
      }
    }
  }
`;

export const DELETE_EXAM = gql`
  mutation DeleteExam($id: ID!) {
    deleteExam(id: $id)
  }
`;

export const ADD_EXAM_QUESTION = gql`
  mutation AddExamQuestion($examId: ID!, $input: ExamQuestionInput!) {
    addExamQuestion(examId: $examId, input: $input) {
      id
      question
      type
      options
      correctAnswer
      points
    }
  }
`;

export const UPDATE_EXAM_QUESTION = gql`
  mutation UpdateExamQuestion($examId: ID!, $questionId: ID!, $input: ExamQuestionInput!) {
    updateExamQuestion(examId: $examId, questionId: $questionId, input: $input) {
      id
      question
      type
      options
      correctAnswer
      points
    }
  }
`;

export const DELETE_EXAM_QUESTION = gql`
  mutation DeleteExamQuestion($examId: ID!, $questionId: ID!) {
    deleteExamQuestion(examId: $examId, questionId: $questionId)
  }
`;