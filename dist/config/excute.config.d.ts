import type { Pool, RowDataPacket, PoolConnection } from "mysql2/promise";
declare class ExcuteQuery {
    pool: Pool;
    constructor();
    getConnection(): Promise<PoolConnection>;
    select<T extends RowDataPacket[]>(query: string, params?: any[]): Promise<T>;
    insert(query: string, params?: any[]): Promise<number>;
    execute(query: string, params?: any[]): Promise<number>;
    excuteMany(query: string, params: any[][]): Promise<{
        affected: number;
        insertIds: number[];
    }>;
}
export default ExcuteQuery;
//# sourceMappingURL=excute.config.d.ts.map