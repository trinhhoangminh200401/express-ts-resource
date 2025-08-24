import { ExpressMiddlewareInterface } from "routing-controllers";
import { Response, Request, NextFunction } from "express";
export declare class AuthenticationMiddleware implements ExpressMiddlewareInterface {
    use(request: Request, response: Response, next: NextFunction): void;
}
//# sourceMappingURL=middleware.d.ts.map