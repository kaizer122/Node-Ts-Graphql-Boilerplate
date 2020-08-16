import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { PlayerModel } from "../../../../models/userModel";
import { getMongooseError } from "../../../../utils/getMongooseError";
import { ROLES } from "../../../../utils/constants";
import { IMutationSignupArgs } from "../../../../types/graphTypes";

export default {
  Mutation: {
    async signup(_, { firstName, lastName, mainPosition, email, password }: IMutationSignupArgs) {
      const pass = await bcrypt.hash(password, 10);
      const user = new PlayerModel({
        firstName,
        lastName,
        email,
        role: ROLES.PLAYER,
        mainPosition,
        password: pass,
      });

      return user
        .save()
        .then(() => {
          return sign({ id: user.id, role: ROLES.PLAYER }, process.env.JWT_SECRET, { expiresIn: "1y" });
        })
        .catch((err) => getMongooseError(err));
    },
  },
};
