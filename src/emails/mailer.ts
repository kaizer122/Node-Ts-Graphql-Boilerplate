import nodemailer from "nodemailer";
import { wrapper } from "./wrapper";

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST as string,
  port: Number(process.env.MAILER_PORT),
  secure: false,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

interface emailOptions {
  subject: string;
  to: string | string[];
  html: string;
  text?: string;
  attachments?: any;
}

const sendEmail = ({ subject, to, html, text = null, attachments = null }: emailOptions) => {
  const mail = {
    html: wrapper(html),
    to,
    subject,
    from: process.env.MAILER_USER,
    text,
    attachments,
  };
  return transporter
    .sendMail(mail)
    .then((r) => console.log(r))
    .catch((e) => console.log(e));
};

export default sendEmail;
