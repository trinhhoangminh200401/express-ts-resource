import { Inject, Service } from "typedi";
import { IAuthenticate, IRegister, IResponseToken } from "../interface/user.interface.js";
import { AuthRepository } from "../repository/auth.repository.js";
import { IFailureResponse, ISuccessResponse } from "../interface/comon.interface.js";
import { MailService } from "./mailer.service.js";
import { randomBytes } from "crypto";
import dotenv from "dotenv";
import { UserRepository } from "../repository/user.repository.js";
import { MagicLinkRepository } from "../repository/magic-link.repository.js";
dotenv.config();
@Service()
export class AuthService {
   constructor(@Inject() private authRepository: AuthRepository, private mailService: MailService, private userRepository: UserRepository, private magicLinkRepository: MagicLinkRepository) { }

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
   async register(credential: IRegister) {
      // 1. Check user tồn tại chưa
      const existingUser = await this.userRepository.findByEmail(credential.email);

      if (existingUser) {
         // 2. Nếu user đã verify rồi -> chặn
         if (existingUser.email_verified_at) {
            return { success: false, error: "Email already in use" };
         }

         // 3. Nếu user chưa verify
         const magicLink = await this.magicLinkRepository.findByLatestUser(existingUser.id);

         if (magicLink && new Date(magicLink.expires_at) > new Date() && !magicLink.used_at) {
            // link còn hạn
            return { success: false, error: "You already registered, please check your email for verification link" };
         }

         // link hết hạn -> tạo mới
         const newToken = randomBytes(32).toString("hex");
         await this.magicLinkRepository.create(existingUser.id, newToken);
         console.log('email',existingUser)
         // gửi lại mail
         const url = `${process.env.BASE_URL}/auth/verify?token=${newToken}&userId=${existingUser.id}`;
         this.mailService.sendMail(existingUser.email, "Verify your email", `Click this link: ${url}`);

         return { success: true, message: "Verification link expired, a new one has been sent" };
      }

      const token = randomBytes(32).toString("hex");
      const userId = await this.authRepository.register(credential, token);

      const url = `${process.env.BASE_URL}/auth/verify?token=${token}&userId=${userId}`;
      this.mailService.sendMail(credential.email, "Verify your email", `Click this link: ${url}`);

      return { success: true, message: "User registered successfully, please verify via email" };
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
            error: "Email verification failed please give another link",
         };
      }
   }
}