import Debug from "debug";
import { Request } from "express";
import type { GraphQLError } from "graphql";
import { IsUserError } from "./userError";
const debug = Debug("graphql:error");
const userDebug = Debug("graphql:user:error");
const queryRe = /\s*(query|mutation)[^{]*/;

const collectQueries = (query) => {
  if (!query) return "No query";
  return query
    .split("\n")
    .map((line) => {
      const m = line.match(queryRe);
      return m ? m[0].trim() : "";
    })
    .filter((line) => !!line)
    .join("\n");
};

const errorPath = (error) => {
  if (!error.path) return "";
  return error.path
    .map((value, index) => {
      if (!index) return value;
      return typeof value === "number" ? `[${value}]` : `.${value}`;
    })
    .join("");
};

const logGraphQLError = (req, error) => {
  debug("---Graphql Error---");
  debug(error);
  error && error.extensions && error.extensions.exception && debug(error.extensions.exception.stacktrace.join("\n"));
  if (req) {
    debug(collectQueries(req.body.query));
    debug("variables", JSON.stringify(req.body.variables || {}));
  }
  const path = errorPath(error);
  path && debug("path", path);
  debug("-------------------\n");
};

const logUserError = (req, error) => {
  userDebug("---Intended User Error---");
  userDebug(error);
  if (req) {
    userDebug(collectQueries(req.body.query));
    userDebug("variables", JSON.stringify(req.body.variables || {}));
  }
  const path = errorPath(error);
  path && userDebug("path", path);
  userDebug("-------------------\n");
};

const createErrorFormatter = (req?: Request) => (error: GraphQLError) => {
  const err = error.originalError || error;
  const isUserError = err[IsUserError];
  if (isUserError) logUserError(req, error);
  else logGraphQLError(req, error);

  return {
    message: isUserError ? error.message : `Internal server error`,
    // Hide the stack trace in production mode
    stack: process.env.NODE_ENV === "production" ? null : error.stack?.split("\n"),
  };
};

export default createErrorFormatter;
