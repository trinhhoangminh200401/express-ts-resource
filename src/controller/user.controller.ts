import { JsonController, Get, Param } from "routing-controllers";
import { Inject, Service } from "typedi";
import { UserService } from "../service/user.service.js";
import { IUser } from "../interface/user.interface.js";

@Service()  
@JsonController("/users")
export class UserController {
  constructor(
    @Inject()
    private userService: UserService
  ) {}

  @Get("/")
  getAll(): IUser[] {
    return this.userService.getAll();
  }

  @Get("/:id")
  getById(@Param("id") id: number): IUser | undefined {
    return this.userService.getById(id);
  }

  customList(): IUser[] {
    return this.userService.getAll().filter(u => u.id > 0);
  }
}
