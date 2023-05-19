import { NextPageContext } from "next";
import { NextUrqlClientConfig } from "next-urql";
import Router from "next/router";
import { ClientOptions, Exchange, SSRExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { pipe, tap } from "wonka";
import { updateQuery } from "./updateQuery";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "@/generated/graphql";

export const isServer = () => typeof window === "undefined";

export const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("not authenticated")) {
          Router.replace("/login");
        }
      })
    );
  };

export const urqlConfig: NextUrqlClientConfig = (
  ssrExchange: SSRExchange,
  ctx?: NextPageContext
): ClientOptions => {
  let cookie;
  if (isServer() && ctx?.req) {
    cookie = ctx.req.headers.cookie;
  }

  // me query doesnt get cached itself
  return {
    url: "http://localhost:4000/graphql",
    exchanges: [
      cacheExchange({
        resolvers: {},
        updates: {
          Mutation: {
            login: (_result, _args, _cache, _info) => {
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
            logout: (_result, _args, cache, _info) => {
              updateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },
            register: (_result, _args, _cache, _info) => {
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
          },
        },
      }),
      ssrExchange,
      errorExchange,
      fetchExchange,
    ],
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
  };
};
