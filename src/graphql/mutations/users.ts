import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      email
      preferredLanguage
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      preferredLanguage
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        preferredLanguage
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($input: UserInput!) {
    registerUser(input: $input) {
      token
      user {
        id
        name
        email
        preferredLanguage
      }
    }
  }
`;