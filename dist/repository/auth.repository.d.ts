import { IRegister, IAuthenticate, IResponseToken } from "../interface/user.interface.js";
import ExcuteQuery from "../config/excute.config.js";
export declare class AuthRepository {
    private excuteQuery;
    constructor(excuteQuery: ExcuteQuery);
    authenticate: (credential: IAuthenticate) => Promise<IResponseToken | null>;
    register: (credential: IRegister, token: string) => Promise<number>;
    verifyToken: (userId: number, token: string) => Promise<boolean>;
}
//# sourceMappingURL=auth.repository.d.ts.map