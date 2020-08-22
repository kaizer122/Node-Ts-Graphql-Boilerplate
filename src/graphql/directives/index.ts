import { IContext } from "../../types/context";
import UserError from "../utils/userError";

export default {
  auth: (next, source, { roles }, { user }: IContext) =>
    roles.includes(user?.role) ? next() : new UserError("Veuillez vous connecter"),
};
