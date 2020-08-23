import { Schema } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import { IPlayerModel } from "../types/modelTypes";
import { ROLES } from "../utils/constants";
import { UserModel } from "./userModel";

const PlayerSchema = new Schema(
  {
    emailVerified: {
      type: Boolean,
      default: false,
    },
    mobileVerified: {
      type: Boolean,
      default: false,
    },
    mainPosition: {
      type: String,
      default: "attaquant",
    },
  },
  { discriminatorKey: "role" },
);
PlayerSchema.plugin(mongooseLeanVirtuals);
export const PlayerModel = UserModel.discriminator<IPlayerModel>(ROLES.PLAYER, PlayerSchema);
