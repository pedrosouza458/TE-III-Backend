import { Message } from "../../../../../responses/response";
import { UserRepository } from "../../../../repository/user-repository";

export class RejectDistributor {
  constructor(private userRepository: UserRepository) {}

  async execute(adminId: string, distributorId: string): Promise<Message> {
    const checkAdmin = await this.userRepository.checkAdmin(adminId);

    if (checkAdmin.statusCode === 200) {
      const response = this.userRepository.disacceptDistributor(distributorId);
      return response;
    }

    return checkAdmin;
  }
}
