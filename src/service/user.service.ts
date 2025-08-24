import { Service } from "typedi";
import { User } from "../interface/user.interface.js";

@Service()
export class UserService {
  private users: User[] = [
    { id: 1, name: "Kiet" },
    { id: 2, name: "Bob" }
  ];

  getAll(): User[] {
    return this.users;
  }
  

  getById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }
}
