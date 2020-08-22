import { Schema } from "mongoose";
import { IPlayerModel } from "../types/modelTypes";
import { ROLES } from "../utils/constants";
import { UserModel } from "./userModel";

const PlayerSchema = new Schema(
  {
    mainPosition: {
      type: String,
      default: "attaquant",
    },
  },
  { discriminatorKey: "role" },
);
export const PlayerModel = UserModel.discriminator<IPlayerModel>(ROLES.PLAYER, PlayerSchema);