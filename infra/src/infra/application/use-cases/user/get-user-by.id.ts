import { User, UserProps } from "../../../entities/domain/user";
import { UserRepository } from "../../../repository/user-repository";
import { Message } from "../../../../responses/response";

export class GetUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<Partial<UserProps> | Message> {
    const user = await this.userRepository.getUserById(userId);
    return user;
  }
}
