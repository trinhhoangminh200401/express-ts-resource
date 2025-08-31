import { Inject, Service } from "typedi";
import { IAuthenticate, IRegister, IResponseToken } from "../interface/user.interface.js";
import { AuthRepository } from "../repository/auth.repository.js";
import { IFailureResponse, ISuccessResponse } from "../interface/comon.interface.js";
import { MailService } from "./mailer.service.js";
import { randomBytes } from "crypto";
import dotenv from "dotenv";
import { UserRepository } from "../repository/user.repository.js";
dotenv.config();
@Service()
export class AuthService {
   constructor(@Inject() private authRepository: AuthRepository, private mailService: MailService,private userRepository: UserRepository) { }

   async login(credential: IAuthenticate): Promise<IResponseToken | IFailureResponse> {
      const data = await this.authRepository.authenticate(credential)
      if (!data) {
         return { success: false, error: "Invalid email or password" };
      }

      return {
         access_token: data.access_token,
         refresh_token: data.refresh_token
      }
   }
   async register(credential: IRegister): Promise<ISuccessResponse | IFailureResponse> {
      try {
         const existingUser = await this.userRepository.checkKingEmail(credential.email);
         if (existingUser.length > 0) {
            return { success: false, error: "Email already in use" };
         }
         const user = await this.authRepository.register(credential);
         if (user) {
            const token = randomBytes(32).toString('hex');
            const url = `${process.env.BASE_URL}/auth/verify?token=${token}&userId=${user}`;

            this.mailService.sendMail(
               credential.email,
               "Welcome to Our Service",
               `Click this link to verify your email: ${url}` 
            ).catch(err => console.error("Mail sending failed:", err));
         }

         return { success: true, message: "User registered successfully" };
      } catch (error) {
         return { success: false, error: "Registration failed" };
      }
   }

   async verifyEmail(userId: number, token: string): Promise<ISuccessResponse | IFailureResponse> {
      const isVerified = await this.authRepository.verifyToken(userId, token);
;
      if (isVerified) {
         return {
            success: true,
            message: "Email verified successfully",
         };
      } else {
         return {
            success: false,
            error: "Email verification failed",
         };
      }
   }
}