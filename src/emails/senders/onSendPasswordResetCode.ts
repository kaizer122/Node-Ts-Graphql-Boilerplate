import sendEmail from "../mailer";
import { getParagraphStyle } from "../wrapper";

const sendPasswordResetCode = ({ fullName, to, code }: { fullName: string; to: string; code: string }) => {
  const subject = "Votre code de réinitialisation du mot de passe";
  const html = onSendResetCodeTemplate({ fullName, code });
  return sendEmail({ subject, to, html });
};

const onSendResetCodeTemplate = ({ fullName, code }: { fullName: string; code: string }) => `
  <p ${getParagraphStyle()}>
    Bonjour ${fullName},
  </p>
  <div style="margin-top:15px">
    <p ${getParagraphStyle()}>
    Vous avez fait une demande de réinitialisation de votre mot de passe, vous pouvez dès à présent utiliser ce code pour changer votre mot de passe.
    </p>
    <br/>
    <p ${getParagraphStyle()}>  Votre code de réinitialisation : <b>${code}</b>
    <br/>
    Vous pourrez ainsi bénéficier à nouveau des services Street Boss.
    </p> 
  </div>
`;

export default sendPasswordResetCode;
