import bcrypt from "bcrypt";
import sendPasswordResetSuccess from "../../../../emails/senders/onPasswordResetSuccess";
import sendPasswordResetCode from "../../../../emails/senders/onSendPasswordResetCode";
import { AdminModel, PlayerModel } from "../../../../models";
import {
  IMutationCheckResetCodeArgs,
  IMutationResetPasswordArgs,
  IMutationSendResetCodeArgs,
} from "../../../../types/graphTypes";
import { IUserModel } from "../../../../types/modelTypes";
import { sendSms } from "../../../../utils/twilio";
import UserError from "../../../utils/userError";
import errorMessages from "../errorMessages";

export default {
  Mutation: {
    sendResetCode: async (_, { email }: IMutationSendResetCodeArgs) => {
      try {
        let user: IUserModel = null;
        user = await PlayerModel.findOne({ email: email.toLowerCase() });
        if (!user) {
          user = await AdminModel.findOne({ email: email.toLowerCase() });
          if (!user) return new UserError(errorMessages.emailNotRegistered);
        }

        const min = 100000;
        const max = 999999;
        const code = Math.floor(Math.random() * (max - min + 1) + min);
        user.resetPasswordCode = code.toString();
        user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
        await user.save();
        try {
          sendPasswordResetCode({ code: code.toString(), fullName: user.fullName, to: user.email });
        } catch (e) {
          console.log(e);
        }
        try {
          const body = `Bonjour ${user.fullName} votre code de réinisialisation est ${code}`;
          sendSms({ to: user.mobile.international, body });
        } catch (e) {
          console.log(e);
        }
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar.sm,
          email: user.email,
        };
      } catch (e) {
        return new Error(e);
      }
    },
    checkResetCode: async (_, { email, code }: IMutationCheckResetCodeArgs) => {
      try {
        let user: IUserModel = null;
        user = await PlayerModel.findOne({ email: email.toLowerCase() });
        if (!user) {
          user = await AdminModel.findOne({ email: email.toLowerCase() });
          if (!user) return new UserError(errorMessages.emailNotRegistered);
        }
        if (user.resetPasswordCode !== code) return new UserError(errorMessages.invalidResetCode);

        const token = Buffer.from(Math.random().toString()).toString("base64");
        user.resetPasswordCode = null;
        user.resetPasswordToken = token;
        await user.save();
        return token;
      } catch (e) {
        return new Error(e);
      }
    },
    resetPassword: async (_, { email, password, token }: IMutationResetPasswordArgs) => {
      try {
        let user: IUserModel = null;
        user = await PlayerModel.findOne({ email: email.toLowerCase() });
        if (!user) {
          user = await AdminModel.findOne({ email: email.toLowerCase() });
          if (!user) return new UserError(errorMessages.emailNotRegistered);
        }
        if (user.resetPasswordToken !== token) return new UserError(errorMessages.invalidResetToken);
        if (user.resetPasswordExpires < Date.now()) return new UserError(errorMessages.resetTokenExpired);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        const pass = await bcrypt.hash(password, 10);
        user.password = pass;
        await user.save();
        sendPasswordResetSuccess({ fullName: user.fullName, to: user.email });
        return true;
      } catch (e) {
        return new Error(e);
      }
    },
  },
};
