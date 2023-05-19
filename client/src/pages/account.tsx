import NavBar from "@/components/NavBar";
import { useMeQuery } from "@/generated/graphql";
import { isServer, urqlConfig } from "@/utils/urqlClient";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";

const Account: React.FC<{}> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  return (
    <>
      <NavBar />
      <div>
        <div className="flex flex-col text-center mt-10">
          {data?.me?.username ?? ""}
          <NextLink href="/login">Login</NextLink>
          <NextLink href="/">Home</NextLink>
        </div>
      </div>
    </>
  );
};

export default withUrqlClient(urqlConfig)(Account);
