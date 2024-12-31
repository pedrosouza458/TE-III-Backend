import { Message } from "../../../../../responses/response";
import { UserRepository } from "../../../../repository/user-repository";

export class AcceptDistributor {
  constructor(private userRepository: UserRepository) {}

  async execute(adminId: string, distributorId: string): Promise<Message> {
    const checkAdmin = await this.userRepository.checkAdmin(adminId);

    if (checkAdmin.statusCode === 200) {
      const response = this.userRepository.acceptDistributor(distributorId);
      return response;
    }

    return checkAdmin;
  }
}
