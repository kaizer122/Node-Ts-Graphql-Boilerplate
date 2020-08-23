import sendEmail from "../mailer";
import { getParagraphStyle } from "../wrapper";
const sendPasswordResetSuccess = ({ to, fullName }: { fullName: string; to: string }) => {
  const subject = "Mot de passe modifié avec succés";
  const html = onPasswordResetSuccessTemplate({ fullName });

  return sendEmail({ subject, to, html });
};

const onPasswordResetSuccessTemplate = ({ fullName }: { fullName: string }) => `
<p ${getParagraphStyle()}>
  Bonjour ${fullName},
  </p>
  <div style="margin-top:15px">
  <p ${getParagraphStyle()}>
  Votre nouveau mot de passe a été enregistré avec succès.
  </p>
  </div>
`;
export default sendPasswordResetSuccess;
