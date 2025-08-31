import { UserService } from "../service/user.service.js";
import { IUser } from "../interface/user.interface.js";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAll(): IUser[];
    getById(id: number): IUser | undefined;
    customList(): IUser[];
}
//# sourceMappingURL=user.controller.d.ts.map