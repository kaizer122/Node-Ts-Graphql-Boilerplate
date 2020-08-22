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
  login?: Maybe<Scalars["String"]>;
  signup?: Maybe<Scalars["String"]>;
  updateName?: Maybe<IUser>;
};

export type IMutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type IMutationSignupArgs = {
  input: ISignupInput;
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
  avatar?: Maybe<Scalars["Upload"]>;
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
