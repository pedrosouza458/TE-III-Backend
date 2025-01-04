import { Message } from "../../../../../responses/response";
import { UserRepository } from "../../../../repository/user-repository";

export class DeleteAdmin {
  constructor(private userRepository: UserRepository) {}

  async execute(adminId: string): Promise<Message> {
    const checkAdmin = await this.userRepository.checkAdmin(adminId);

    if (checkAdmin.statusCode === 200) {
      const response = await this.userRepository.deleteUser(adminId);
      return response;
    }

    return checkAdmin;
  }
}
