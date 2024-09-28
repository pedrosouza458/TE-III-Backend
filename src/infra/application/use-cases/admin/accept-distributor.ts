import { Message } from "../../../../responses/response";
import { Admin, AdminProps } from "../../../entities/domain/admin";
import { AdminRepository } from "../../../repository/admin-repository";

export class AcceptDistributor {
  constructor(
    private adminRepository: AdminRepository,
  ) {}

  async execute(adminId: string, distributorId: string): Promise<Message> {
    const checkAdmin = await this.adminRepository.checkAdmin(adminId);

    if(checkAdmin.statusCode === 200){
      const response = this.adminRepository.acceptDistributor(distributorId)
      return response
    }

    return checkAdmin;
  }
}
