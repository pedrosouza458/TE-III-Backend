import { Message } from "../../../../responses/response";
import { Admin, AdminProps } from "../../../entities/domain/admin";
import { AdminRepository } from "../../../repository/admin-repository";

export class DeleteAdmin {
  constructor(private adminRepository: AdminRepository) {}

  async execute(adminId: string): Promise<Message> {
    const response = await this.adminRepository.deleteAdmin(adminId);
    return response;
  }
}
