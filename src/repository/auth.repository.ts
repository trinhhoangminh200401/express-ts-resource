import { Inject, Service } from "typedi";
import { IRegister, IAuthenticate, IUser, IResponseToken } from "../interface/user.interface.js";
import ExcuteQuery from "../config/excute.config.js";
import { RowDataPacket } from "mysql2";
import dotnet from "dotenv";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
dotnet.config();
const JWT_KEY = process.env.JWT_SECRET!;
@Service()
export class AuthRepository {

   constructor(@Inject() private excuteQuery: ExcuteQuery) { }
   authenticate = async (credential: IAuthenticate): Promise<IResponseToken | null> => {
      const query = `SELECT * FROM users WHERE email = ?`;
      const rows = await this.excuteQuery.select<(IUser & RowDataPacket)[]>(query, [credential.email]);

      const dbUser = rows[0];
      if (!dbUser) return null;
      const match = await bcrypt.compare(credential.password_hash, dbUser.password_hash);
      if (!match) return null;
      const access_token = jwt.sign({ userId: dbUser.id, userName: dbUser.name }, JWT_KEY, { expiresIn: '1m' });;
      const refresh_token = jwt.sign({ userId: dbUser.id }, JWT_KEY, { expiresIn: '7d' });

      return { access_token, refresh_token };
   }
   register = async (credential: IRegister,token:string) => {
      const connection = await this.excuteQuery.getConnection();
      try {
         await connection.beginTransaction();
         const hash = await bcrypt.hash(credential.password_hash, 10);
         const query = `INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`;
         const result = await this.excuteQuery.insert(query, [credential.name, credential.email, hash]);
         const userId = result;
         const query2 = `
         INSERT INTO magic_links (user_id, token_hash, expires_at, used_at)
         VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE), NULL)
      `;
      await this.excuteQuery.insert(query2, [userId, token]);
      await connection.commit();

      return result
      } catch (error) {
         await connection.rollback();
         throw error;
      }
   
   }
   verifyToken = async (userId: number, token: string): Promise<boolean> => {
     const query = `
         SELECT * FROM magic_links
         WHERE token_hash = ? AND user_id = ?
           AND used_at IS NULL
           AND expires_at > NOW()
         LIMIT 1
      `;
      const rows = await this.excuteQuery.select<(RowDataPacket & any)[]>(query, [token, userId]);

      if (rows.length === 0) return false;

      const magicLink = rows[0];

      const updateLink = `UPDATE magic_links SET used_at = NOW() WHERE id = ?`;
      await this.excuteQuery.execute(updateLink, [magicLink.id]);

      const updateUser = `UPDATE users SET email_verified_at = NOW() WHERE id = ?`;
      await this.excuteQuery.execute(updateUser, [magicLink.user_id]);

      return true;
   }
}