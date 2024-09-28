import { Admin } from "../entities/domain/admin";

export interface AdminRepository {
  create(admin: Admin): Promise<void>
  deleteAdmin(adminId: string): Promise<void>
}