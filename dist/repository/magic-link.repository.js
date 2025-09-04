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
import { Service, Inject } from "typedi";
import ExcuteQuery from "../config/excute.config.js";
let MagicLinkRepository = class MagicLinkRepository {
    constructor(excuteQuery) {
        this.excuteQuery = excuteQuery;
    }
    async checkMagicLink(userId, token) {
        const query = `SELECT id,email FROM magic_links WHERE user_id = ? AND used_at IS NULL AND expires_at > NOW()`;
        const result = await this.excuteQuery.select(query, [userId]);
        return result;
    }
    async findByLatestUser(userId) {
        const query = `
                        SELECT *
                        FROM magic_links
                        WHERE user_id = ?
                       
                        LIMIT 1
                  `;
        const rows = await this.excuteQuery.select(query, [userId]);
        return rows.length > 0 ? rows[0] : null;
    }
    async create(userId, token) {
        const query = `
                         INSERT INTO magic_links (user_id, token_hash, expires_at, used_at)
                         VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE), NULL) `;
        return await this.excuteQuery.insert(query, [userId, token]);
    }
};
MagicLinkRepository = __decorate([
    Service(),
    __param(0, Inject()),
    __metadata("design:paramtypes", [ExcuteQuery])
], MagicLinkRepository);
export { MagicLinkRepository };
//# sourceMappingURL=magic-link.repository.js.map