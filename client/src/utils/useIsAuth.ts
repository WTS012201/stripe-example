import { useRouter } from "next/router";
import React from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  React.useEffect(() => {
    if (!data?.me && !fetching) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [fetching, data, router]);
};
