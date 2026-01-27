import { gql } from '@apollo/client';

export const GET_EXERCISES = gql`
  query GetExercises($subject: Subject) {
    exercises(subject: $subject) {
      id
      title
      question
      explanation
      subject
    }
  }
`;

export const GET_EXERCISE_BY_ID = gql`
  query GetExerciseById($id: ID!) {
    exercise(id: $id) {
      id
      title
      question
      explanation
      subject
    }
  }
`;

export const GET_EXERCISES_BY_SUBJECT = gql`
  query GetExercisesBySubject($subject: Subject!) {
    exercises(subject: $subject) {
      id
      title
      question
      subject
    }
  }
`;

export const GET_EXERCISES_WITH_COURSES = gql`
  query GetExercisesWithCourses($subject: Subject) {
    exercises(subject: $subject) {
      id
      title
      question
      subject
    }
    courses(subject: $subject) {
      id
      title
      subject
    }
  }
`;