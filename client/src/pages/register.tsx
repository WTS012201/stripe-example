import { InputField } from "@/components/InputField";
import { useRegisterMutation } from "@/generated/graphql";
import { toErrorMap } from "@/utils/toErrorMap";
import { urqlConfig } from "@/utils/urqlClient";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";

const Register: React.FC<{}> = ({}) => {
  const [, register] = useRegisterMutation();
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
      email: { value: string };
    };
    const response = await register({
      credentials: {
        username: target.username.value,
        password: target.password.value,
        email: target.email.value,
      },
    });

    if (response.data?.createUser.errors) {
      const errors = toErrorMap(response.data.createUser.errors);
      setErrorMessage(errors);
    } else if (response.data?.createUser.user) {
      setErrorMessage(null);
      router.push("/");
    }
  };

  return (
    <div className=" min-h-screen flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8 ">
      <div className="bg-white px-12 rounded-3xl pb-12 w-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register an account
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
              error={errorMessage}
            />
            <InputField
              type="email"
              name="email"
              label="Email"
              error={errorMessage}
            />
            <div>
              <button
                type="submit"
                className="mt-12 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withUrqlClient(urqlConfig)(Register);
