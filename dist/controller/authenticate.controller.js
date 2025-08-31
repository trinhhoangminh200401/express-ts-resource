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
import { JsonController, Post, Body, Req, Get, UseBefore, QueryParam } from "routing-controllers";
import { Inject, Service } from "typedi";
import { AuthService } from "../service/auth.service.js";
import { AuthenticationMiddleware } from "../middleware/middleware.js";
let AuthenticateController = class AuthenticateController {
    constructor(authService) {
        this.authService = authService;
    }
    authenticateUser(crendential) {
        return this.authService.login(crendential);
    }
    async register(credential) {
        return await this.authService.register(credential);
    }
    profile(request) {
        return "1233";
    }
    async verifyEmail(userId, token) {
        return await this.authService.verifyEmail(userId, token);
    }
};
__decorate([
    Post("/login"),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthenticateController.prototype, "authenticateUser", null);
__decorate([
    Post("/register"),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticateController.prototype, "register", null);
__decorate([
    Get('/profile'),
    UseBefore(AuthenticationMiddleware),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthenticateController.prototype, "profile", null);
__decorate([
    Get('/verify'),
    __param(0, QueryParam('userId')),
    __param(1, QueryParam('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AuthenticateController.prototype, "verifyEmail", null);
AuthenticateController = __decorate([
    Service(),
    JsonController("/auth"),
    __param(0, Inject()),
    __metadata("design:paramtypes", [AuthService])
], AuthenticateController);
export { AuthenticateController };
//# sourceMappingURL=authenticate.controller.js.map