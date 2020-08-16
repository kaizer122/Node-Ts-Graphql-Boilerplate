import { codegen } from "@graphql-codegen/core";
import * as typescriptPlugin from "@graphql-codegen/typescript";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "apollo-server";
import * as fs from "fs";
import { parse, printSchema } from "graphql";
import path from "path";
const outputFile = "../src/types/graphTypes.ts";

const getSchema = () => {
  const typesArray = loadFilesSync(path.join(__dirname, "../src/graphql/modules"), {
    extensions: ["graphql"],
    recursive: true,
  });
  const typeDefs = mergeTypeDefs(typesArray);
  return makeExecutableSchema({
    resolvers: {},
    typeDefs,
  });
};

const config = {
  filename: outputFile,
  schema: parse(printSchema(getSchema())),
  plugins: [
    {
      typescript: {
        typesPrefix: "I",
      },
    },
  ],
  pluginMap: {
    typescript: typescriptPlugin,
  },
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
codegen(config as any)
  .then((output) => {
    fs.writeFile(path.join(__dirname, outputFile), output, () => {
      console.log("Types generated!");
    });
  })
  .catch((e) => console.log(e));
