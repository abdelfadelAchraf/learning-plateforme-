import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      preferredLanguage
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      id
      name
      email
      preferredLanguage
    }
  }
`;

export const GET_USER_WITH_RESULTS = gql`
  query GetUserWithResults($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
      preferredLanguage
    }
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

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser @client # Pour les données locales Apollo
  }
`;