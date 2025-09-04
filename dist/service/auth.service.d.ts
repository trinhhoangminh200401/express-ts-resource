import { IAuthenticate, IRegister, IResponseToken } from "../interface/user.interface.js";
import { AuthRepository } from "../repository/auth.repository.js";
import { IFailureResponse, ISuccessResponse } from "../interface/comon.interface.js";
import { MailService } from "./mailer.service.js";
import { UserRepository } from "../repository/user.repository.js";
import { MagicLinkRepository } from "../repository/magic-link.repository.js";
export declare class AuthService {
    private authRepository;
    private mailService;
    private userRepository;
    private magicLinkRepository;
    constructor(authRepository: AuthRepository, mailService: MailService, userRepository: UserRepository, magicLinkRepository: MagicLinkRepository);
    login(credential: IAuthenticate): Promise<IResponseToken | IFailureResponse>;
    register(credential: IRegister): Promise<{
        success: boolean;
        error: string;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    }>;
    verifyEmail(userId: number, token: string): Promise<ISuccessResponse | IFailureResponse>;
}
//# sourceMappingURL=auth.service.d.ts.map