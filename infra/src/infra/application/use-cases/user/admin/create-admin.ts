import { v4 as uuid } from "uuid"; 
import { User, UserProps } from "../../../../entities/domain/user";
import { UserRepository } from "../../../../repository/user-repository";
import { Message } from "../../../../../responses/response";

export class CreateAdmin {
  constructor(private userRepository: UserRepository) {}

  async execute(userProps: Partial<UserProps>): Promise<Message> {
    const user = User.create(userProps as UserProps, uuid());

    const response = await this.userRepository.createAdmin(user);
    return response;
  }
}
