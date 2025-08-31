var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Service } from "typedi";
import { AuthRepository } from "../repository/auth.repository.js";
import { MailService } from "./mailer.service.js";
import { randomBytes } from "crypto";
import dotenv from "dotenv";
import { UserRepository } from "../repository/user.repository.js";
dotenv.config();
let AuthService = class AuthService {
    constructor(authRepository, mailService, userRepository) {
        this.authRepository = authRepository;
        this.mailService = mailService;
        this.userRepository = userRepository;
    }
    async login(credential) {
        const data = await this.authRepository.authenticate(credential);
        if (!data) {
            return { success: false, error: "Invalid email or password" };
        }
        return {
            access_token: data.access_token,
            refresh_token: data.refresh_token
        };
    }
    async register(credential) {
        try {
            const existingUser = await this.userRepository.checkKingEmail(credential.email);
            if (existingUser.length > 0) {
                return { success: false, error: "Email already in use" };
            }
            const user = await this.authRepository.register(credential);
            if (user) {
                const token = randomBytes(32).toString('hex');
                const url = `${process.env.BASE_URL}/auth/verify?token=${token}&userId=${user}`;
                this.mailService.sendMail(credential.email, "Welcome to Our Service", `Click this link to verify your email: ${url}`).catch(err => console.error("Mail sending failed:", err));
            }
            return { success: true, message: "User registered successfully" };
        }
        catch (error) {
            return { success: false, error: "Registration failed" };
        }
    }
    async verifyEmail(userId, token) {
        const isVerified = await this.authRepository.verifyToken(userId, token);
        ;
        if (isVerified) {
            return {
                success: true,
                message: "Email verified successfully",
            };
        }
        else {
            return {
                success: false,
                error: "Email verification failed",
            };
        }
    }
};
AuthService = __decorate([
    Service(),
    __param(0, Inject()),
    __metadata("design:paramtypes", [AuthRepository, MailService, UserRepository])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map