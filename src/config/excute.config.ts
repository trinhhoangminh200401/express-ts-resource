import { Service } from "typedi";
import pool from "./database.config.js";
import type { Pool, RowDataPacket, ResultSetHeader, PoolConnection } from "mysql2/promise";
@Service() 
class ExcuteQuery{
    pool: Pool;
    constructor(){
        this.pool = pool;
    }
     async getConnection(): Promise<PoolConnection> {
        return await this.pool.getConnection();
    }

    async select<T extends RowDataPacket[]>(query: string, params: any[] = []): Promise<T> {
        const [rows] = await this.pool.execute<T>(query, params);
        return rows;   
        
    }
    async excute(query:string,params:any[]=[]):Promise<number>{
        const[result]= await this.pool.execute<ResultSetHeader>(query,params);
        return result.insertId;
    }

}

export default ExcuteQuery;