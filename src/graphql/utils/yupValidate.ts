import { ValidationError } from "yup";
import UserError from "./userError";
const validateSchema = ({ schema, variables = null, input }) => {
  try {
    schema(variables).validateSync(input, { abortEarly: true });
    return { valid: true, error: null };
  } catch (e) {
    if (e instanceof ValidationError) {
      return { valid: false, error: new UserError(e.message) };
    } else {
      return { valid: false, error: new Error(e) };
    }
  }
};
export default validateSchema;
