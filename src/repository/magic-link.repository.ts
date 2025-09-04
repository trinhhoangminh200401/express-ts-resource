import { Service, Inject } from "typedi";
import ExcuteQuery from "../config/excute.config.js";
import { RowDataPacket } from "mysql2";
@Service()
export class MagicLinkRepository {

        constructor(@Inject() private excuteQuery: ExcuteQuery) { }
        async checkMagicLink(userId: number, token: string) {
                const query = `SELECT id,email FROM magic_links WHERE user_id = ? AND used_at IS NULL AND expires_at > NOW()`;
                const result = await this.excuteQuery.select<any & RowDataPacket[]>(query, [userId]);
                return result;
        }
        async findByLatestUser(userId: number) {
                const query = `
                        SELECT *
                        FROM magic_links
                        WHERE user_id = ?
                       
                        LIMIT 1
                  `;
                const rows = await this.excuteQuery.select<(RowDataPacket & any)[]>(query, [userId]);
                return rows.length > 0 ? rows[0] : null;

        }
        async create(userId: number, token: string) {
                const query = `
                         INSERT INTO magic_links (user_id, token_hash, expires_at, used_at)
                         VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE), NULL) `;
                return await this.excuteQuery.insert(query, [userId, token]);
        }
}