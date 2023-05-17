import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Credentials = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Errors = {
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginCredentials = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: UserResponse;
  login: User;
  logout: Scalars['Boolean'];
};


export type MutationCreateUserArgs = {
  credentials: Credentials;
};


export type MutationLoginArgs = {
  credentials: LoginCredentials;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  updated_at: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = Errors & {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type StandardErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type StandardUserFragment = { __typename?: 'User', id: number, username: string };

export type StandardUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string } | null };

export type LoginMutationVariables = Exact<{
  credentials: LoginCredentials;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', id: number, username: string } };

export type RegisterMutationVariables = Exact<{
  credentials: Credentials;
}>;


export type RegisterMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string } | null };

export const StandardErrorFragmentDoc = gql`
    fragment StandardError on FieldError {
  field
  message
}
    `;
export const StandardUserFragmentDoc = gql`
    fragment StandardUser on User {
  id
  username
}
    `;
export const StandardUserResponseFragmentDoc = gql`
    fragment StandardUserResponse on UserResponse {
  errors {
    ...StandardError
  }
  user {
    ...StandardUser
  }
}
    ${StandardErrorFragmentDoc}
${StandardUserFragmentDoc}`;
export const LoginDocument = gql`
    mutation Login($credentials: LoginCredentials!) {
  login(credentials: $credentials) {
    ...StandardUser
  }
}
    ${StandardUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($credentials: Credentials!) {
  createUser(credentials: $credentials) {
    ...StandardUserResponse
  }
}
    ${StandardUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...StandardUser
  }
}
    ${StandardUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};