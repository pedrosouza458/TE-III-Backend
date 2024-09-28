import { Admin, AdminProps } from "../../../entities/domain/admin";
import { AdminRepository } from "../../../repository/admin-repository";

export class CreateAdmin {
  constructor(private adminRepository: AdminRepository) {}

  async execute({ name, password }: AdminProps): Promise<void> {
    const admin = Admin.create({ name, password });
    
    await this.adminRepository.createAdmin(admin);
  }
}