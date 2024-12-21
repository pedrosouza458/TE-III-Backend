import { Message } from "../../../../responses/response";
import { AdminRepository } from "../../../repository/admin-repository";

export class RejectDistributor {
  constructor(private adminRepository: AdminRepository) {}

  async execute(adminId: string, distributorId: string): Promise<Message> {
    const checkAdmin = await this.adminRepository.checkAdmin(adminId);

    if (checkAdmin.statusCode === 200) {
      const response = this.adminRepository.disacceptDistributor(distributorId);
      return response;
    }

    return checkAdmin;
  }
}
