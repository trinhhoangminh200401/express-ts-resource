import { Service } from "typedi";
import { IUser } from "../interface/user.interface.js";

@Service()
export class UserService {
  private users: IUser[] = [
    {
      id: 1, name: "Kiet",
      email: "ádsa",
      password_hash: "ádsadsa"
    },
    {
      id: 2, name: "Bob",
      email: "ấdsa",
      password_hash: "ádsa"
    }
  ];

  getAll(): IUser[] {
    return this.users;
  }
  

  getById(id: number): IUser | undefined {
    return this.users.find(u => u.id === id);
  }
}
