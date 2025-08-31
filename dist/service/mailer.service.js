var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Service } from "typedi";
import { MailTransporter } from "../config/mailer.config.js";
let MailService = class MailService {
    async sendMail(to, subject, body) {
        await MailTransporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            text: body,
        });
    }
};
MailService = __decorate([
    Service()
], MailService);
export { MailService };
//# sourceMappingURL=mailer.service.js.map