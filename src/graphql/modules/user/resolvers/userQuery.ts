import { UserModel } from "../../../../models/userModel";
import UserError from "../../../utils/userError";
import { ROLES } from "../../../../utils/constants";
import { IContext } from "../../../../types/context";

export default {
  User: {
    __resolveType: (_, { user }) => {
      if (user.role === ROLES.ADMIN) return "Admin";
      else return "Player";
    },
  },
  Query: {
    me(_, __, { user }: IContext) {
      if (!user) {
        throw new UserError("You are not authenticated!");
      }
      return UserModel.findById(user.id).lean({ virtuals: true });
    },
  },
};
