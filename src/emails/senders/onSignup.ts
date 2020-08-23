import sendEmail from "../mailer";
import { getParagraphStyle } from "../wrapper";

const sendSignupEmail = ({ fullName, to, token }: { fullName: string; to: string; token: string }) => {
  const link = `${process.env.API_URL}/accountVerification/${token}`;
  const subject = "Bienvenue sur Street Boss";
  const html = onSignupTemplate({ fullName, link });
  return sendEmail({ subject, to, html });
};

const onSignupTemplate = ({ fullName, link }) =>
  `<p ${getParagraphStyle()}>
  Bienvenue sur Street Boss ${fullName},
</p>
<div style="margin-top:30px">
  <p ${getParagraphStyle()}>Pour confirmer votre email veuillez cliquer sur <a href="${link}">ce lien.</a></p>
  </div>`;

export default sendSignupEmail;
