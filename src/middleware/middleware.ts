import {Middleware, ExpressMiddlewareInterface} from "routing-controllers";
import { Response,Request, NextFunction } from "express";
@Middleware({ type: "after" })
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
     use(request: Request, response: Response, next: NextFunction) {
       const token = request.headers["authorization"];
       if (!token) {
           response.status(401).json({ error: "Unauthorized" });
           return;
       }
        next();
   }
} 