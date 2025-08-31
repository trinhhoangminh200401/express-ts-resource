import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { Response, Request, NextFunction } from "express";
import { Service } from "typedi";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

@Service()
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, response: Response, next: NextFunction) {

    const token = request.query.token as string || request.headers['authorization']?.split(' ')[1] || request.headers["authorization"];
    if (!token) {
      return response.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        return response
          .status(403)
          .json({ message: "Token is expired!", error: "Forbidden" });
      }

      (request as any).user = decoded;

      return next();

    })
  }  
      
}