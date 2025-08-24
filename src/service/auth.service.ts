import { AuthRepository } from "../repository/auth.repository.js";

export class AuthService {
   constructor(private authRepository: AuthRepository) {}

   async login(token: string) {
     
}
}