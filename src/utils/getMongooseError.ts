import UserError from "../graphql/utils/userError";
const getDuplicateUniqueError = (error) => {
  const valueKeys = Object.values(error.keyValue);
  const patternKeys = Object.keys(error.keyPattern);
  if (valueKeys.length <= 0 && patternKeys.length <= 0) return new Error(error);
  const value = valueKeys[0];
  const label = getFrenchLabel(patternKeys[0]);

  return new UserError(`'${value}' existe dèja veuillez choisir un autre ${label}`);
};
const getValidationError = (err) => {
  if (err.errors.length <= 0) return new Error(err);
  let message = "";
  const values = Object.values(err.errors);
  if (values.length <= 0) return new Error(err);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values.map((v: any, i) => (message += v.message + (i < values.length - 1 ? ", " : "")));
  return new UserError(message);
};

const getFrenchLabel = (label) => {
  switch (label) {
    case "email":
      return "adresse email";
    case "username":
      return "nom d'utilisateur";
  }
};

export const getMongooseError = (err) => {
  if (err.code === 11000 && err.name === "MongoError") return getDuplicateUniqueError(err);
  else if (err.errors) return getValidationError(err);
  else return new Error(err);
};
