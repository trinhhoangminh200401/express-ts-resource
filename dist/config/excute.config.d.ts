import type { Pool, RowDataPacket, PoolConnection } from "mysql2/promise";
declare class ExcuteQuery {
    pool: Pool;
    constructor();
    getConnection(): Promise<PoolConnection>;
    select<T extends RowDataPacket[]>(query: string, params?: any[]): Promise<T>;
    excute(query: string, params?: any[]): Promise<number>;
}
export default ExcuteQuery;
//# sourceMappingURL=excute.config.d.ts.map