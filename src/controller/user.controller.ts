import { JsonController, Get, Param } from "routing-controllers";
import { Inject, Service } from "typedi";
import { UserService } from "../service/user.service.js";
import { User } from "../models/user.model.js";

@Service()  
@JsonController("")
export class UserController {
  constructor(
    @Inject()
    private userService: UserService
  ) {}

  @Get("/")
  getAll(): User[] {
    return this.userService.getAll();
  }

  @Get("/:id")
  getById(@Param("id") id: number): User | undefined {
    return this.userService.getById(id);
  }

  customList(): User[] {
    return this.userService.getAll().filter(u => u.id > 0);
  }
}
