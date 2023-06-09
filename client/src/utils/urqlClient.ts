import { NextPageContext } from "next";
import { NextUrqlClientConfig } from "next-urql";
import Router from "next/router";
import { ClientOptions, Exchange, SSRExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { pipe, tap } from "wonka";
import { mutations } from "./updateQuery";

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

  return {
    url: "http://localhost:4000/graphql",
    exchanges: [
      cacheExchange({
        resolvers: {},
        updates: {
          Mutation: mutations,
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
