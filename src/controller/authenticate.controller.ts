import { JsonController, Post, Body, Req, Get, UseBefore, QueryParam } from "routing-controllers";
import { Inject, Service } from "typedi";
import { AuthService } from "../service/auth.service.js";
import { IAuthenticate, IUser } from "../interface/user.interface.js";
import { Request } from "express";
import { AuthenticationMiddleware } from "../middleware/middleware.js";

@Service()
@JsonController("/auth")
export class AuthenticateController {
  constructor(@Inject() private authService: AuthService) { }

  @Post("/login")
  authenticateUser(@Body() crendential: IAuthenticate) {
    return this.authService.login(crendential);
  }
  @Post("/register")
  async register(@Body() credential: IUser) {
    return await this.authService.register(credential);
  }

  @Get('/profile')
  @UseBefore(AuthenticationMiddleware)
  profile(@Req() request: Request) {
    return "1233"
  }
  @Get('/verify')
 async verifyEmail(@QueryParam('userId') userId: number, @QueryParam('token') token: string) {
   return  await this.authService.verifyEmail(userId, token);
  }
}
