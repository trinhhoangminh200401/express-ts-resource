import { Service } from "typedi";
import { User } from "../models/user.model.js";

@Service()
export class UserService {
  private users: User[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
  ];

  getAll(): User[] {
    return this.users;
  }
  

  getById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }
}
