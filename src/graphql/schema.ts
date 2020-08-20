import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "apollo-server";
import Debug from "debug";
import createGraphQLLogger from "graphql-log";
import path from "path";
const typesArray = loadFilesSync(path.join(__dirname, "./modules"), {
  extensions: ["graphql"],
  recursive: true,
});

const types = mergeTypeDefs(typesArray);
const resolversArray = loadFilesSync(path.join(__dirname, "./modules/**/resolvers/**"), {
  extensions: ["ts", "js"],
  recursive: true,
});

const resolvers = mergeResolvers(resolversArray);

//Logging
const logExecutions = createGraphQLLogger({
  logger: Debug("graphql:resolvers"),
});
logExecutions(resolvers);

export default makeExecutableSchema({
  typeDefs: types,
  resolvers: resolvers,
});
