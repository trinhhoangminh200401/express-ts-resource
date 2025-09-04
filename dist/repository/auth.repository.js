var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Service } from "typedi";
import ExcuteQuery from "../config/excute.config.js";
import dotnet from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
dotnet.config();
const JWT_KEY = process.env.JWT_SECRET;
let AuthRepository = class AuthRepository {
    constructor(excuteQuery) {
        this.excuteQuery = excuteQuery;
        this.authenticate = async (credential) => {
            const query = `SELECT * FROM users WHERE email = ?`;
            const rows = await this.excuteQuery.select(query, [credential.email]);
            const dbUser = rows[0];
            if (!dbUser)
                return null;
            const match = await bcrypt.compare(credential.password_hash, dbUser.password_hash);
            if (!match)
                return null;
            const access_token = jwt.sign({ userId: dbUser.id, userName: dbUser.name }, JWT_KEY, { expiresIn: '1m' });
            ;
            const refresh_token = jwt.sign({ userId: dbUser.id }, JWT_KEY, { expiresIn: '7d' });
            return { access_token, refresh_token };
        };
        this.register = async (credential, token) => {
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
                return result;
            }
            catch (error) {
                await connection.rollback();
                throw error;
            }
        };
        this.verifyToken = async (userId, token) => {
            const query = `
         SELECT * FROM magic_links
         WHERE token_hash = ? AND user_id = ?
           AND used_at IS NULL
           AND expires_at > NOW()
         LIMIT 1
      `;
            const rows = await this.excuteQuery.select(query, [token, userId]);
            if (rows.length === 0)
                return false;
            const magicLink = rows[0];
            const updateLink = `UPDATE magic_links SET used_at = NOW() WHERE id = ?`;
            await this.excuteQuery.execute(updateLink, [magicLink.id]);
            const updateUser = `UPDATE users SET email_verified_at = NOW() WHERE id = ?`;
            await this.excuteQuery.execute(updateUser, [magicLink.user_id]);
            return true;
        };
    }
};
AuthRepository = __decorate([
    Service(),
    __param(0, Inject()),
    __metadata("design:paramtypes", [ExcuteQuery])
], AuthRepository);
export { AuthRepository };
//# sourceMappingURL=auth.repository.js.map