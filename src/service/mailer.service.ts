import { Service } from "typedi";
import { MailTransporter} from "../config/mailer.config.js";

@Service()
export class MailService {
  async sendMail(to: string, subject: string, body: string) {
    await MailTransporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
     text: body, 
    });
  }
}
