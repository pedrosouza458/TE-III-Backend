import { Message } from "../../../../responses/response";
import { Admin, AdminProps } from "../../../entities/domain/admin";
import { AdminRepository } from "../../../repository/admin-repository";

export class CreateAdmin {
  constructor(private adminRepository: AdminRepository) {}

  async execute({ name, password }: AdminProps): Promise<Message> {
    const admin = Admin.create({ name, password });

    const response = await this.adminRepository.createAdmin(admin);
    return response;
  }
}
