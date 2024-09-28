import { Message } from "../../responses/response";
import { Admin } from "../entities/domain/admin";

export interface AdminRepository {
  createAdmin(admin: Admin): Promise<void>;
  deleteAdmin(adminId: string): Promise<void>;
  checkAdmin(adminId: string): Promise<Message>,
  acceptDistributor(distributorId: string): Promise<void>;
  disacceptDistributor(distributorId: string): Promise<void>;
}
