import { gql } from '@apollo/client';

export const CREATE_COURSE = gql`
  mutation CreateCourse($input: CourseInput!) {
    createCourse(input: $input) {
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

export const UPDATE_COURSE = gql`
  mutation UpdateCourse($id: ID!, $input: CourseInput!) {
    updateCourse(id: $id, input: $input) {
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

export const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id)
  }
`;

export const ADD_CHAPTER = gql`
  mutation AddChapter($courseId: ID!, $input: ChapterInput!) {
    addChapter(courseId: $courseId, input: $input) {
      id
      title
      content
      order
    }
  }
`;

export const UPDATE_CHAPTER = gql`
  mutation UpdateChapter($courseId: ID!, $chapterId: ID!, $input: ChapterInput!) {
    updateChapter(courseId: $courseId, chapterId: $chapterId, input: $input) {
      id
      title
      content
      order
    }
  }
`;

export const DELETE_CHAPTER = gql`
  mutation DeleteChapter($courseId: ID!, $chapterId: ID!) {
    deleteChapter(courseId: $courseId, chapterId: $chapterId)
  }
`;