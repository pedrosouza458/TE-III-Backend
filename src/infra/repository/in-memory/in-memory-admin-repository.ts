import { Admin } from "../../entities/domain/admin";
import { AdminRepository } from "../admin-repository";

export class InMemoryAdminRepository implements AdminRepository {
  public admin: Admin[] = [];

  async create(admin: Admin): Promise<void> {
    this.admin.push(admin);
  }

  async deleteAdmin(adminId: string) {
    this.admin = this.admin.filter(a => a.id !== adminId);
  }
  
}
