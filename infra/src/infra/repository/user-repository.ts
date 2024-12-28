import { Message } from "../../responses/response";
import { User } from "../entities/domain/user";

export interface UserRepository {
  createUser(user: User): Promise<Message>
  createAdmin(admin: User): Promise<Message>;
  loginUser(userName: string, userPassword: string): Promise<void>;
  logoutUser(): Promise<void>;
  updateUser(userId: string, props: User): Promise<void>;
  deleteUser(userId: string): Promise<Message>;
  checkAdmin(adminId: string): Promise<Message>,
  acceptDistributor(distributorId: string): Promise<Message>;
  disacceptDistributor(distributorId: string): Promise<Message>;
}
