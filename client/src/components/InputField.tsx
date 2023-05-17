import React, { useState } from "react";
type InputFieldProps = {
  name: string;
  label: string;
  error?: Record<string, string> | null;
  type?: string;
  textarea?: boolean;
  forgotPassword?: boolean;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, setField] = useState<InputFieldProps>(props);
  let C = props.textarea ? (
    <textarea
      id={field.name}
      name={field.name}
      required
      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder={field.label}
    />
  ) : (
    <input
      id={field.name}
      name={field.name}
      type={field.type ? field.type : "text"}
      required
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
      placeholder={field.label}
    />
  );
  React.useEffect(() => {
    if (props !== field) {
      setField(props);
    }
  }, [props]);
  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={field.name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {field.label}
        </label>

        {field.label === "Password" && field.forgotPassword && (
          <div className="text-sm">
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>
        )}
      </div>
      {C}
      {/* may make an error component for this */}
      <div>{!!field.error && field.error[field.name]}</div>
    </div>
  );
};
