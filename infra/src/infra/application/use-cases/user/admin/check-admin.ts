import { v4 as uuid } from "uuid";
import { User, UserProps } from "../../../../entities/domain/user";
import { UserRepository } from "../../../../repository/user-repository";
import { Message } from "../../../../../responses/response";

export class CheckAdmin {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<Message> {
    const response = await this.userRepository.checkAdmin(userId);
    return response;
  }
}
