import { Document } from "mongoose";

type mobile = {
  international: string | null;
  national: string | null;
  countryCode: string | null;
  regionCode: string | null;
};
type avatar = {
  sm: string | null;
  md: string | null;
  lg: string | null;
  original: string;
};

export interface IUserModel extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profileImage: string;
  mobile: mobile;
  avatar: avatar;
  connected: boolean;
  accountStatus: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DELETED";
  role: "PLAYER" | "ADMIN";
  country: string;
  city: string;
  location: [number, number];
  address: string;
  resetPasswordCode: string | null;
  resetPasswordExpires: number | null;
  resetPasswordToken: string | null;
  createdAt: number;
  updatedAt: number;
  lastSeen: number;
}

export interface IPlayerModel extends IUserModel {
  mainPosition: string;
}
export interface IAdminModel extends IUserModel {
  permission: string;
}
