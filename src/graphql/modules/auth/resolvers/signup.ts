import PhoneNumber from "awesome-phonenumber";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { Types } from "mongoose";
import sendSignupEmail from "../../../../emails/senders/onSignup";
import { PlayerModel } from "../../../../models";
import { IMutationSignupArgs, ISignupInput } from "../../../../types/graphTypes";
import { ROLES } from "../../../../utils/constants";
import { getMongooseError } from "../../../../utils/getMongooseError";
import { generateImageWithSize, uploadFile } from "../../../../utils/uploadUtils";
import validateSchema from "../../../utils/yupValidate";
import signupSchema from "../validations/signup";

export default {
  Mutation: {
    async signup(_, { input }: IMutationSignupArgs) {
      try {
        const { valid, error } = validateSchema({ schema: signupSchema, input });
        if (!valid) return error;
        const _id = new Types.ObjectId();
        const avatar = await getAvatar(input, _id);
        const pass = await bcrypt.hash(input.password, 10);
        const pn = new PhoneNumber(input.mobile);
        const mobile = {
          international: pn.getNumber("international"),
          national: pn.getNumber("national"),
          countryCode: "+" + pn.getCountryCode(),
          regionCode: pn.getRegionCode(),
        };
        const location = Object.values(input.location);
        const user = new PlayerModel({
          ...input,
          _id,
          password: pass,
          avatar,
          mobile,
          location,
        });
        return user
          .save()
          .then((savedUser) => {
            const token = sign({ id: user.id, role: ROLES.PLAYER }, process.env.JWT_SECRET, { expiresIn: "1y" });
            sendSignupEmail({ fullName: savedUser.fullName, to: savedUser.email, token });
            return token;
          })
          .catch((err) => getMongooseError(err));
      } catch (e) {
        return new Error(e);
      }
    },
  },
};

const getAvatar = (input: ISignupInput, _id) =>
  new Promise(async (resolve, reject) => {
    try {
      const original = await uploadFile({
        file: input.avatar,
        id: _id,
        subPath: "avatars",
      });
      const promises = [
        generateImageWithSize({ originalPath: original, id: _id, width: 100, height: 100 }),
        generateImageWithSize({ originalPath: original, id: _id, width: 300, height: 300 }),
        generateImageWithSize({ originalPath: original, id: _id, width: 500, height: 500 }),
      ];

      const [sm, md, lg] = await Promise.all(promises);
      const avatar = { original, sm, md, lg };
      return resolve(avatar);
    } catch (e) {
      reject(e);
    }
  });
