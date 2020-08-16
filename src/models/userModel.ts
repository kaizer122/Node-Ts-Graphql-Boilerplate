import mongoose from "mongoose";
import { IPlayerModel, IAdminModel } from "../types/modelTypes";
import { EMAIL_REGEX, ROLES } from "../utils/constants";
import { capitalize } from "../utils/functions";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [EMAIL_REGEX, "Email invalide"],
    },
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      get: (v) => capitalize(v),
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      get: (v) => capitalize(v),
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: Object.keys(ROLES),
      default: ROLES.PLAYER,
    },
  },
  {
    discriminatorKey: "role",
  },
);
UserSchema.plugin(mongooseLeanVirtuals);
export const UserModel = mongoose.model<IPlayerModel | IAdminModel>("users", UserSchema);

export const AdminModel = UserModel.discriminator<IAdminModel>(
  ROLES.ADMIN,
  new mongoose.Schema(
    {
      permission: {
        type: String,
        enum: ["ADMIN", "SUPER_ADMIN"],
        default: "ADMIN",
      },
    },
    { discriminatorKey: "role" },
  ),
);

export const PlayerModel = UserModel.discriminator<IPlayerModel>(
  ROLES.PLAYER,
  new mongoose.Schema(
    {
      mainPosition: {
        type: String,
        default: "attaquant",
      },
    },
    { discriminatorKey: "role" },
  ),
);
