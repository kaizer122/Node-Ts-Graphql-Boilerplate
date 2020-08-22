import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { UserModel } from "../../../../models";
import { IMutationLoginArgs } from "../../../../types/graphTypes";
import UserError from "../../../utils/userError";

export default {
  Mutation: {
    async login(_, { email, password }: IMutationLoginArgs) {
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return new UserError("No user with that email");
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return new UserError("Incorrect log in details");
      }
      return sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1y" });
    },
  },
};
