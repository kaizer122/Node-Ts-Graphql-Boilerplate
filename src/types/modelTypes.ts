import mongoose from "mongoose";

export interface IUserModel extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  profileImage: string;
}
export interface IPlayerModel extends IUserModel {
  mainPosition: string;
}
export interface IAdminModel extends IUserModel {
  permission: string;
}
