import { AdminModel, PlayerModel } from "../../../../models";
import { IContext } from "../../../../types/context";
import { ROLES } from "../../../../utils/constants";

export default {
  User: {
    __resolveType: (_, { user }: IContext) => {
      if (user.role === ROLES.ADMIN) return "Admin";
      else return "Player";
    },
  },
  Query: {
    me(_, __, { user }: IContext) {
      if (user.role === ROLES.ADMIN) return AdminModel.findById(user.id).lean({ virtuals: true });
      return PlayerModel.findById(user.id).lean({ virtuals: true });
    },
  },
};
