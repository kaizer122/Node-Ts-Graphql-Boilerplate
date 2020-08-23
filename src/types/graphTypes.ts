export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type IAdmin = IUser & {
  __typename?: "Admin";
  id: Scalars["ID"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  role: Scalars["String"];
  profileImage?: Maybe<Scalars["String"]>;
  permission?: Maybe<Scalars["String"]>;
};

export type ILocationInput = {
  lat: Scalars["Float"];
  lng: Scalars["Float"];
};

export type IMutation = {
  __typename?: "Mutation";
  loginPlayer: Scalars["String"];
  loginAdmin: Scalars["String"];
  signup: Scalars["String"];
  sendResetCode: IResetCodeResponse;
  checkResetCode: Scalars["String"];
  resetPassword: Scalars["Boolean"];
  updateName?: Maybe<IUser>;
};

export type IMutationLoginPlayerArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type IMutationLoginAdminArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type IMutationSignupArgs = {
  input: ISignupInput;
};

export type IMutationSendResetCodeArgs = {
  email: Scalars["String"];
};

export type IMutationCheckResetCodeArgs = {
  email: Scalars["String"];
  code: Scalars["String"];
};

export type IMutationResetPasswordArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  token: Scalars["String"];
};

export type IMutationUpdateNameArgs = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
};

export type IPlayer = IUser & {
  __typename?: "Player";
  id: Scalars["ID"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  role: Scalars["String"];
  profileImage?: Maybe<Scalars["String"]>;
  mainPosition?: Maybe<Scalars["String"]>;
};

export type IQuery = {
  __typename?: "Query";
  me?: Maybe<IUser>;
};

export type IResetCodeResponse = {
  __typename?: "resetCodeResponse";
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  avatar?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
};

export enum IRole {
  Admin = "ADMIN",
  Player = "PLAYER",
}

export type ISignupInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  mainPosition: Scalars["String"];
  email: Scalars["String"];
  mobile: Scalars["String"];
  password: Scalars["String"];
  country?: Maybe<Scalars["String"]>;
  city: Scalars["String"];
  address: Scalars["String"];
  location: ILocationInput;
  avatar: Scalars["Upload"];
};

export type ISubscription = {
  __typename?: "Subscription";
  playerProfileUpdated?: Maybe<IUser>;
};

export type IUser = {
  id: Scalars["ID"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  role: Scalars["String"];
  profileImage?: Maybe<Scalars["String"]>;
};
