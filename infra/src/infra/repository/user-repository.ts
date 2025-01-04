import { Message } from "../../responses/response";
import { User, UserProps } from "../entities/domain/user";

export interface UserRepository {
  getUserById(userId: string): Promise<Partial<UserProps & { id: string }> | Message>
  createUser(user: User): Promise<Message>
  createAdmin(admin: User): Promise<Message>;
  loginUser(userName: string, userPassword: string): Promise<Message>;
  logoutUser(): Promise<void>;
  updateUser(userId: string, updatedProps: Partial<UserProps>): Promise<Message>
  deleteUser(userId: string): Promise<Message>;
  checkAdmin(adminId: string): Promise<Message>;
  switchingUserRole(userId: string): Promise<Message>
}
