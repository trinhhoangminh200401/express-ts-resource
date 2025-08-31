import { AuthService } from "../service/auth.service.js";
import { IAuthenticate, IUser } from "../interface/user.interface.js";
import { Request } from "express";
export declare class AuthenticateController {
    private authService;
    constructor(authService: AuthService);
    authenticateUser(crendential: IAuthenticate): Promise<import("../interface/user.interface.js").IResponseToken | import("../interface/comon.interface.js").IFailureResponse>;
    register(credential: IUser): Promise<import("../interface/comon.interface.js").ISuccessResponse | import("../interface/comon.interface.js").IFailureResponse>;
    profile(request: Request): string;
    verifyEmail(userId: number, token: string): Promise<import("../interface/comon.interface.js").ISuccessResponse | import("../interface/comon.interface.js").IFailureResponse>;
}
//# sourceMappingURL=authenticate.controller.d.ts.map