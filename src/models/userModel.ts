import moment from "moment-timezone";
import { model, Schema } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import { IAdminModel, IPlayerModel } from "../types/modelTypes";
import { ACCOUNT_STATUS, DEFAULT_CITY, DEFAULT_COUNTRY, EMAIL_REGEX, ROLES } from "../utils/constants";
import { capitalize } from "../utils/functions";
const AvatarSchema = new Schema(
  {
    sm: {
      default: null,
      type: String,
    },
    md: {
      default: null,
      type: String,
    },
    lg: {
      default: null,
      type: String,
    },
    original: {
      required: true,
      type: String,
    },
  },
  { _id: false },
);

const MobileSchema = new Schema(
  {
    international: {
      default: null,
      type: String,
    },
    national: {
      default: null,
      type: String,
    },
    countryCode: {
      default: null,
      type: String,
    },
    regionCode: {
      default: null,
      type: String,
    },
  },
  { _id: false },
);

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [EMAIL_REGEX, "Email invalide"],
      index: true,
    },
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      get: (v) => capitalize(v),
      index: true,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      get: (v) => capitalize(v),
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: MobileSchema,
      default: {
        international: null,
        national: null,
        countryCode: null,
        regionCode: null,
      },
    },
    country: {
      type: String,
      default: DEFAULT_COUNTRY,
      index: true,
    },
    city: {
      type: String,
      default: DEFAULT_CITY,
      required: true,
    },
    location: {
      type: [Number],
      index: true,
    },
    address: { type: String, required: true },
    resetPasswordCode: String,
    resetPasswordExpires: Number,
    resetPasswordToken: String,
    avatar: {
      type: AvatarSchema,
      required: true,
    },
    connected: {
      type: Boolean,
      default: false,
      set: (v) => {
        if (!v) this.lastSeen = moment().valueOf();
        return v;
      },
    },
    accountStatus: {
      type: String,
      enum: Object.keys(ACCOUNT_STATUS),
      default: ACCOUNT_STATUS.ACTIVE,
    },
    role: {
      type: String,
      enum: Object.keys(ROLES),
      default: ROLES.PLAYER,
    },
    createdAt: {
      type: Number,
      default: moment().valueOf(),
    },
    updatedAt: {
      type: Number,
      default: moment().valueOf(),
    },
    lastSeen: {
      type: Number,
      default: moment().valueOf(),
    },
  },
  {
    discriminatorKey: "role",
  },
);
UserSchema.index({ location: "2dsphere" });
UserSchema.plugin(mongooseLeanVirtuals);

export const UserModel = model<IPlayerModel | IAdminModel>("users", UserSchema);
