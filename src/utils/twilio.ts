import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendVerificationCode = (mobileNumber) => {
  return new Promise((resolve, reject) =>
    client.verify
      .services(process.env.TWILIO_VA)
      .verifications.create({ to: mobileNumber, channel: "sms" })
      .then((verification) => {
        if (verification) resolve(true);
        else
          return reject("Nous n'avons pas pu vous envoyer un message de validation, veuillez essayer ultérieurement");
      })
      .catch((e) => {
        console.log(e);
        return reject("Nous n'avons pas pu vous envoyer un message de validation, veuillez essayer ultérieurement");
      }),
  );
};

export const verifyCode = (mobileNumber, code) => {
  return new Promise((resolve, reject) =>
    client.verify
      .services(process.env.TWILIO_VA)
      .verificationChecks.create({ to: mobileNumber, code: code })
      .then((verification_check) => resolve(verification_check))
      .catch((e) => {
        console.log(e);
        return reject("Nous n'avons pas pu vérifier votre code, veuillez essayer ultérieurement");
      }),
  );
};

export const sendSms = ({ to, body }) =>
  new Promise((resolve) => {
    client.messages
      .create({
        from: process.env.TWILIO_TRIAL_NUMBER,
        to,
        body,
      })
      .then((res) => resolve(true))
      .catch((e) => {
        console.log(e);
        resolve(true);
      });
  });
