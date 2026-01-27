import { gql } from '@apollo/client';

export const SUBMIT_EXAM_RESULT = gql`
  mutation SubmitExamResult($input: ExamResultInput!) {
    submitExamResult(input: $input) {
      examId
      score
      totalQuestions
      correctAnswers
      completedAt
      passed
    }
  }
`;

export const CREATE_EXAM_RESULT = gql`
  mutation CreateExamResult($input: ExamResultInput!) {
    createExamResult(input: $input) {
      examId
      score
      totalQuestions
      correctAnswers
      completedAt
      passed
    }
  }
`;