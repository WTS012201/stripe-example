import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "src/**/*.graphql",
  generates: {
    "src/generated/graphql.tsx": {
      plugins: ["typescript", "typescript-operations", "typescript-urql"],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
