import { UserService } from "../service/user.service.js";
import { User } from "../interface/user.model.js";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAll(): User[];
    getById(id: number): User | undefined;
    customList(): User[];
}
//# sourceMappingURL=user.controller.d.ts.map