import { Inject, Service } from "typedi";
import { IRegister, IAuthenticate, IUser, IResponseToken } from "../interface/user.interface.js";
import ExcuteQuery from "../config/excute.config.js";
import { RowDataPacket } from "mysql2";
import dotnet from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IFailureResponse, ISuccessResponse } from "../interface/comon.interface.js";
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
   register = async (credential: IRegister) => {
      const hash = await bcrypt.hash(credential.password_hash, 10);
      const query = `INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`;
      const result = await this.excuteQuery.excute(query, [credential.name, credential.email, hash]);
      return result
   }
   verifyToken = async (userId: number, token: string): Promise<boolean> => {
      const connection = await this.excuteQuery.getConnection();
      try {
         await connection.beginTransaction();
         const query = `Update users set email_verified_at=NOW() where id = ?`;
         const query2 = `INSERT INTO magic_links ( user_id,token_hash,expires_at,used_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE),null)`;
         await this.excuteQuery.excute(query, [userId]);
         await this.excuteQuery.excute(query2, [userId,token]);
         await connection.commit();
         return true;

      } catch (error) {
         console.log(error)
         await connection.rollback();
         return false;
      }
   }
}