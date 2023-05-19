import { Inter } from "next/font/google";
import { useIsAuth } from "@/utils/useIsAuth";
import { withUrqlClient } from "next-urql";
import { urqlConfig } from "@/utils/urqlClient";
import React from "react";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

const Home: React.FC = () => {
  useIsAuth();

  return (
    <>
      <NavBar />
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      ></main>
    </>
  );
};

export default withUrqlClient(urqlConfig)(Home);
