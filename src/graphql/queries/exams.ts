import { gql } from '@apollo/client';

export const GET_EXAMS = gql`
  query GetExams($subject: Subject) {
    exams(subject: $subject) {
      id
      title
      description
      subject
      questions {
        id
        question
        type
        points
      }
    }
  }
`;

export const GET_EXAM_BY_ID = gql`
  query GetExamById($id: ID!) {
    exam(id: $id) {
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

export const GET_EXAM_WITH_QUESTIONS = gql`
  query GetExamWithQuestions($id: ID!) {
    exam(id: $id) {
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

export const GET_EXAMS_BY_SUBJECT = gql`
  query GetExamsBySubject($subject: Subject!) {
    exams(subject: $subject) {
      id
      title
      description
      subject
      questions {
        id
        question
        type
        points
      }
    }
  }
`;