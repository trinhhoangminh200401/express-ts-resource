import ExcuteQuery from "../config/excute.config.js";
import { RowDataPacket } from "mysql2";
export declare class UserRepository {
    private excuteQuery;
    constructor(excuteQuery: ExcuteQuery);
    findByEmail(email: string): Promise<RowDataPacket | null>;
}
//# sourceMappingURL=user.repository.d.ts.map