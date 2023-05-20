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
  cancelSubscription: UserResponse;
  changeCard: UserResponse;
  createSubscription: UserResponse;
  createUser: UserResponse;
  login: User;
  logout: Scalars['Boolean'];
};


export type MutationChangeCardArgs = {
  last4: Scalars['String'];
  source: Scalars['String'];
};


export type MutationCreateSubscriptionArgs = {
  last4: Scalars['String'];
  source: Scalars['String'];
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
  last4?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  updated_at: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = Errors & {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type StandardErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type StandardUserFragment = { __typename?: 'User', id: number, username: string, type: string };

export type StandardUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, type: string } | null };

export type CancelSubscriptionMutationVariables = Exact<{ [key: string]: never; }>;


export type CancelSubscriptionMutation = { __typename?: 'Mutation', cancelSubscription: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, type: string } | null } };

export type ChangeCardMutationVariables = Exact<{
  source: Scalars['String'];
  last4: Scalars['String'];
}>;


export type ChangeCardMutation = { __typename?: 'Mutation', changeCard: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, type: string } | null } };

export type CreateSubscriptionMutationVariables = Exact<{
  source: Scalars['String'];
  last4: Scalars['String'];
}>;


export type CreateSubscriptionMutation = { __typename?: 'Mutation', createSubscription: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, type: string } | null } };

export type LoginMutationVariables = Exact<{
  credentials: LoginCredentials;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', id: number, username: string, type: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  credentials: Credentials;
}>;


export type RegisterMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, type: string } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', last4?: string | null, id: number, username: string, type: string } | null };

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
  type
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
export const CancelSubscriptionDocument = gql`
    mutation CancelSubscription {
  cancelSubscription {
    ...StandardUserResponse
  }
}
    ${StandardUserResponseFragmentDoc}`;

export function useCancelSubscriptionMutation() {
  return Urql.useMutation<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>(CancelSubscriptionDocument);
};
export const ChangeCardDocument = gql`
    mutation ChangeCard($source: String!, $last4: String!) {
  changeCard(source: $source, last4: $last4) {
    ...StandardUserResponse
  }
}
    ${StandardUserResponseFragmentDoc}`;

export function useChangeCardMutation() {
  return Urql.useMutation<ChangeCardMutation, ChangeCardMutationVariables>(ChangeCardDocument);
};
export const CreateSubscriptionDocument = gql`
    mutation CreateSubscription($source: String!, $last4: String!) {
  createSubscription(source: $source, last4: $last4) {
    ...StandardUserResponse
  }
}
    ${StandardUserResponseFragmentDoc}`;

export function useCreateSubscriptionMutation() {
  return Urql.useMutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>(CreateSubscriptionDocument);
};
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
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
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
    last4
    ...StandardUser
  }
}
    ${StandardUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};