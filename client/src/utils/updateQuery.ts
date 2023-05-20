import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "@/generated/graphql";
import { DataFields, Variables, ResolveInfo } from "@urql/exchange-graphcache";
import { Cache, QueryInput } from "@urql/exchange-graphcache";

export function updateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

export const mutations = {
  login: (
    _result: DataFields,
    _args: Variables,
    _cache: Cache,
    _info: ResolveInfo
  ) => {
    updateQuery<LoginMutation, MeQuery>(
      _cache,
      { query: MeDocument },
      _result,
      (result, query) => {
        if (result.login) {
          return {
            me: result.login,
          };
        } else {
          return query;
        }
      }
    );
  },
  logout: (
    _result: DataFields,
    _args: Variables,
    _cache: Cache,
    _info: ResolveInfo
  ) => {
    updateQuery<LogoutMutation, MeQuery>(
      _cache,
      { query: MeDocument },
      _result,
      () => ({ me: null })
    );
  },
  register: (
    _result: DataFields,
    _args: Variables,
    _cache: Cache,
    _info: ResolveInfo
  ) => {
    updateQuery<RegisterMutation, MeQuery>(
      _cache,
      { query: MeDocument },
      _result,
      (result, query) => {
        if (result.createUser.errors) {
          return query;
        } else {
          return {
            me: result.createUser.user,
          };
        }
      }
    );
  },
};
