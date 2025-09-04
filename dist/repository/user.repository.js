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
let UserRepository = class UserRepository {
    constructor(excuteQuery) {
        this.excuteQuery = excuteQuery;
    }
    async findByEmail(email) {
        const result = await this.excuteQuery.select("SELECT id,email  FROM users WHERE email = ?", [email]);
        console.log('debug', result);
        return result.length > 0 ? result[0] : null;
    }
};
UserRepository = __decorate([
    Service(),
    __param(0, Inject()),
    __metadata("design:paramtypes", [ExcuteQuery])
], UserRepository);
export { UserRepository };
//# sourceMappingURL=user.repository.js.map