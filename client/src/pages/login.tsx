import { InputField } from "@/components/InputField";
import { useLoginMutation } from "@/generated/graphql";
import { toErrorMap } from "@/utils/toErrorMap";
import { urqlConfig } from "@/utils/urqlClient";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";

const Login: React.FC<{}> = ({}) => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<Record<
    string,
    string
  > | null>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const response = await login({
      credentials: {
        username: target.username.value,
        password: target.password.value,
      },
    });

    if (!response.data?.login.id) {
      const errors = toErrorMap([
        { field: "password", message: "Username or password incorrect" },
      ]);
      setErrorMessage(errors);
    } else if (response.data?.login.id) {
      setErrorMessage(null);
      if (typeof router.query.next === "string") {
        router.push(router.query.next);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div className=" min-h-screen flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8 w-auto">
      <div className="bg-white px-12 rounded-3xl pb-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action=""
            method="POST"
            onSubmit={onSubmit}
          >
            <InputField
              type="text"
              name="username"
              label="Username"
              error={errorMessage}
            />
            <InputField
              type="password"
              name="password"
              label="Password"
              forgotPassword={true}
              error={errorMessage}
            />

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?
              <a
                href="#"
                className="ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={() => router.push("/register")}
              >
                Start a 14 day free trial
              </a>
            </p>

            <div>
              <button
                type="submit"
                className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withUrqlClient(urqlConfig)(Login);
