var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Service } from "typedi";
let UserService = class UserService {
    constructor() {
        this.users = [
            { id: 1, name: "Kiet" },
            { id: 2, name: "Bob" }
        ];
    }
    getAll() {
        return this.users;
    }
    getById(id) {
        return this.users.find(u => u.id === id);
    }
};
UserService = __decorate([
    Service()
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map