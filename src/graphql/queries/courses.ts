import { gql } from '@apollo/client';

export const GET_COURSES = gql`
  query GetCourses($subject: Subject) {
    courses(subject: $subject) {
      id
      title
      description
      subject
      chapters {
        id
        title
        content
        order
      }
    }
  }
`;

export const GET_COURSE_BY_ID = gql`
  query GetCourseById($id: ID!) {
    course(id: $id) {
      id
      title
      description
      subject
      chapters {
        id
        title
        content
        order
      }
    }
  }
`;

export const GET_COURSE_WITH_EXERCISES = gql`
  query GetCourseWithExercises($courseId: ID!, $subject: Subject) {
    course(id: $courseId) {
      id
      title
      description
      subject
      chapters {
        id
        title
        content
        order
      }
    }
    exercises(subject: $subject) {
      id
      title
      question
      explanation
      subject
    }
  }
`;

export const GET_COURSE_CHAPTERS = gql`
  query GetCourseChapters($courseId: ID!) {
    course(id: $courseId) {
      id
      title
      chapters {
        id
        title
        content
        order
      }
    }
  }
`;