import { PubSub } from "apollo-server-express";
const pubSub = new PubSub();

const PLAYER_PROFILE_UPDATED = "USER_NAME_UPDATED";

export { pubSub, PLAYER_PROFILE_UPDATED };
