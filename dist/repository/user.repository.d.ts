import ExcuteQuery from "../config/excute.config.js";
import { IUser } from "../interface/user.interface.js";
import { RowDataPacket } from "mysql2";
export declare class UserRepository {
    private excuteQuery;
    constructor(excuteQuery: ExcuteQuery);
    checkKingEmail(email: string): Promise<IUser & RowDataPacket[]>;
}
//# sourceMappingURL=user.repository.d.ts.map