export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  mainPosition: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
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
