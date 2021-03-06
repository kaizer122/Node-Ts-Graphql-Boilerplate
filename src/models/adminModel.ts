import { Schema } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import { IAdminModel } from "../types/modelTypes";
import { ROLES } from "../utils/constants";
import { UserModel } from "./userModel";

const AdminSchema = new Schema(
  {
    permission: {
      type: String,
      enum: ["ADMIN", "SUPER_ADMIN"],
      default: "ADMIN",
    },
  },
  { discriminatorKey: "role" },
);

AdminSchema.plugin(mongooseLeanVirtuals);

export const AdminModel = UserModel.discriminator<IAdminModel>(ROLES.ADMIN, AdminSchema);
