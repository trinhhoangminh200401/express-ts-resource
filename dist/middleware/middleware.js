var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Service } from "typedi";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
let AuthenticationMiddleware = class AuthenticationMiddleware {
    use(request, response, next) {
        const token = request.query.token || request.headers['authorization']?.split(' ')[1] || request.headers["authorization"];
        if (!token) {
            return response.status(401).json({ error: "Unauthorized" });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return response
                    .status(403)
                    .json({ message: "Token is expired!", error: "Forbidden" });
            }
            request.user = decoded;
            return next();
        });
    }
};
AuthenticationMiddleware = __decorate([
    Service()
], AuthenticationMiddleware);
export { AuthenticationMiddleware };
//# sourceMappingURL=middleware.js.map