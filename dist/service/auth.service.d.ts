import { AuthRepository } from "../repository/auth.repository.js";
export declare class AuthService {
    private authRepository;
    constructor(authRepository: AuthRepository);
    login(token: string): Promise<void>;
}
//# sourceMappingURL=auth.service.d.ts.map