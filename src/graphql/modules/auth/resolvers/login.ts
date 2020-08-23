import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { AdminModel, PlayerModel } from "../../../../models";
import { IMutationLoginArgs } from "../../../../types/graphTypes";
import UserError from "../../../utils/userError";
import errorMessages from "../errorMessages.e";

export default {
  Mutation: {
    async loginPlayer(_, { email, password }: IMutationLoginArgs) {
      const user = await PlayerModel.findOne({ email: email.toLowerCase() });
      if (!user) return new UserError(errorMessages.invalidCredentials);

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return new UserError(errorMessages.invalidCredentials);
      if (user.accountStatus === "SUSPENDED") return new UserError(errorMessages.suspendedAccount);
      // TODO: handle account deleted / inactive
      return sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1y" });
    },
    async loginAdmin(_, { email, password }: IMutationLoginArgs) {
      const user = await AdminModel.findOne({ email: email.toLowerCase() });
      if (!user) return new UserError(errorMessages.invalidCredentials);
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return new UserError(errorMessages.invalidCredentials);
      if (user.accountStatus === "SUSPENDED") return new UserError(errorMessages.suspendedAccount);
      // TODO: handle account deleted / inactive
      return sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1y" });
    },
  },
};
