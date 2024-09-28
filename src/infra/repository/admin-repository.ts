import { Admin } from "../entities/domain/admin";

export interface AdminRepository {
  createAdmin(admin: Admin): Promise<void>
  deleteAdmin(adminId: string): Promise<void>
  acceptDistributor(distributorId: string): Promise<void>
  disacceptDistributor(distributorId: string): Promise<void>
}