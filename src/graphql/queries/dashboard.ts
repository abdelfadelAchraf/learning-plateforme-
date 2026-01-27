import { gql } from '@apollo/client';

export const GET_DASHBOARD_STATS = gql`
  query GetDashboardStats {
    totalCourses: courses {
      id
    }
    totalExercises: exercises {
      id
    }
    totalExams: exams {
      id
    }
    totalUsers: users {
      id
    }
  }
`;
