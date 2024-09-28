import { Admin } from "../entities/domain/admin";

export interface AdminRepository {
  createAdmin(admin: Admin): Promise<void>
  deleteAdmin(adminId: string): Promise<void>
  checkAdmin(adminId: string): Promise<boolean>
  acceptDistributor(distributorId: string): Promise<void>
  disacceptDistributor(distributorId: string): Promise<void>
}