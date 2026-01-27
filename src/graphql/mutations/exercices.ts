import { gql } from '@apollo/client';

export const CREATE_EXERCISE = gql`
  mutation CreateExercise($input: ExerciseInput!) {
    createExercise(input: $input) {
      id
      title
      question
      explanation
      subject
    }
  }
`;

export const UPDATE_EXERCISE = gql`
  mutation UpdateExercise($id: ID!, $input: ExerciseInput!) {
    updateExercise(id: $id, input: $input) {
      id
      title
      question
      explanation
      subject
    }
  }
`;

export const DELETE_EXERCISE = gql`
  mutation DeleteExercise($id: ID!) {
    deleteExercise(id: $id)
  }
`;