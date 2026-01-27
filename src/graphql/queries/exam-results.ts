import { gql } from '@apollo/client';

export const GET_EXAM_RESULTS = gql`
  query GetExamResults($userId: ID!) {
    examResults(userId: $userId) {
      examId
      score
      totalQuestions
      correctAnswers
      completedAt
      passed
    }
  }
`;

export const GET_EXAM_RESULT_DETAILS = gql`
  query GetExamResultDetails($examId: ID!, $userId: ID!) {
    examResult(examId: $examId, userId: $userId) {
      examId
      score
      totalQuestions
      correctAnswers
      completedAt
      passed
    }
    exam(id: $examId) {
      id
      title
      description
      subject
    }
  }
`;

export const GET_USER_PERFORMANCE = gql`
  query GetUserPerformance($userId: ID!) {
    examResults(userId: $userId) {
      examId
      score
      passed
      completedAt
    }
  }
`;

export const GET_EXAM_STATISTICS = gql`
  query GetExamStatistics($examId: ID!) {
    # Ici vous pourriez avoir une query spécifique pour les statistiques
    exam(id: $examId) {
      id
      title
      questions {
        id
        question
        type
        points
      }
    }
  }
`;