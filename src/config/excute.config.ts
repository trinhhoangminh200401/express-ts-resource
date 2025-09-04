import { Service } from "typedi";
import pool from "./database.config.js";
import type { Pool, RowDataPacket, ResultSetHeader, PoolConnection } from "mysql2/promise";
@Service()
class ExcuteQuery {
    pool: Pool;
    constructor() {
        this.pool = pool;
    }
    async getConnection(): Promise<PoolConnection> {
        return await this.pool.getConnection();
    }

    async select<T extends RowDataPacket[]>(query: string, params: any[] = []): Promise<T> {
        const [rows] = await this.pool.execute<T>(query, params);
        return rows;

    }
    // insert return id 
    async insert(query: string, params: any[] = []): Promise<number> {
        const [result] = await this.pool.execute<ResultSetHeader>(query, params);
        return result.insertId;
    }
    // update/delete return affected rows
    async execute(query: string, params: any[] = []): Promise<number> {
        const [result] = await this.pool.execute<ResultSetHeader>(query, params);
        return result.affectedRows;
    }
    async excuteMany(query: string, params: any[][]): Promise<{ affected: number; insertIds: number[] }> {
        const conn = await this.pool.getConnection();
        try {
            await conn.beginTransaction();
            let affected = 0;
            const insertIds: number[] = [];

            for (const param of params) {
                const [result] = await conn.execute<ResultSetHeader>(query, param);
                affected += result.affectedRows;
                if (result.insertId) insertIds.push(result.insertId);
            }

            await conn.commit();
            return { affected, insertIds };
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    }
}


export default ExcuteQuery;