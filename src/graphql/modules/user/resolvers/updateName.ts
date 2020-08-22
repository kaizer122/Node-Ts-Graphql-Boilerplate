import { withFilter } from "apollo-server";
import { PlayerModel } from "../../../../models";
import { IMutationUpdateNameArgs, IUser } from "../../../../types/graphTypes";
import { PLAYER_PROFILE_UPDATED, pubSub } from "../../../utils/pubsubs";
import UserError from "../../../utils/userError";

export default {
  Mutation: {
    async updateName(_, { firstName, lastName }: IMutationUpdateNameArgs, { user }) {
      if (!user) {
        throw new UserError("You are not authenticated!");
      }
      const userModel = await PlayerModel.findById(user.id);
      userModel.firstName = firstName;
      userModel.lastName = lastName;
      const updatedUser = await userModel.save();
      pubSub.publish(PLAYER_PROFILE_UPDATED, {
        playerProfileUpdated: updatedUser,
      });
      return updatedUser;
    },
  },
  Subscription: {
    playerProfileUpdated: {
      resolve: ({ playerProfileUpdated: { id } }: { playerProfileUpdated: IUser }) => {
        return PlayerModel.findById(id).lean();
      },
      subscribe: withFilter(
        () => pubSub.asyncIterator(PLAYER_PROFILE_UPDATED),
        ({ playerProfileUpdated }, _, context) => {
          if (context.user) return playerProfileUpdated._id.toString() === context.user.id;
          else return false;
        },
      ),
    },
  },
};
