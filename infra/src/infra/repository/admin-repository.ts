import { Message } from "../../responses/response";
import { Admin } from "../entities/domain/admin";

export interface AdminRepository {
  createAdmin(admin: Admin): Promise<Message>;
  loginAdmin(adminName: string, adminPassword: string): Promise<void>;
  logoutAdmin(): Promise<void>;
  updateAdmin(adminId: string, props: Admin): Promise<void>;
  deleteAdmin(adminId: string): Promise<Message>;
  checkAdmin(adminId: string): Promise<Message>,
  acceptDistributor(distributorId: string): Promise<Message>;
  disacceptDistributor(distributorId: string): Promise<Message>;
}