import ExcuteQuery from "../config/excute.config.js";
export declare class MagicLinkRepository {
    private excuteQuery;
    constructor(excuteQuery: ExcuteQuery);
    checkMagicLink(userId: number, token: string): Promise<any>;
    findByLatestUser(userId: number): Promise<any>;
    create(userId: number, token: string): Promise<number>;
}
//# sourceMappingURL=magic-link.repository.d.ts.map