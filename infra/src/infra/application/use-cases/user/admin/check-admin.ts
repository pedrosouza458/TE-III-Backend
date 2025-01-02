import { v4 as uuid } from "uuid";
import { User, UserProps } from "../../../../entities/domain/user";
import { UserRepository } from "../../../../repository/user-repository";
import { Message } from "../../../../../responses/response";

export class CheckAdmin {
  constructor(private userRepository: UserRepository) {}

  async execute(adminId: string): Promise<Message> {
    const response = await this.userRepository.checkAdmin(adminId);
    return response;
  }
}
