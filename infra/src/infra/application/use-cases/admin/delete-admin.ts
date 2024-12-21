import { Message } from "../../../../responses/response";
import { AdminRepository } from "../../../repository/admin-repository";

export class DeleteAdmin {
  constructor(private adminRepository: AdminRepository) {}

  async execute(adminId: string): Promise<Message> {
    const checkAdmin = await this.adminRepository.checkAdmin(adminId);

    if (checkAdmin.statusCode === 200) {
      const response = await this.adminRepository.deleteAdmin(adminId);
      return response;
    }

    return checkAdmin;
  }
}
