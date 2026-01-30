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

export const LOGIN_MUTATION = gql`
  mutation Login($input: AuthInput!) {
    login(input: $input) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;
