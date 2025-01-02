import { Message } from "../../../../responses/response";
import { UserProps } from "../../../entities/domain/user";
import { UserRepository } from "../../../repository/user-repository";

export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, updatedProps: Partial<UserProps>): Promise<Message> {
    // Fetch the user first
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      return Error.create({
        message: "User not found",
        statusCode: 404,
      });
    }

    // Prevent role updates
    if (updatedProps.role && updatedProps.role !== user.props.role) {
      return Error.create({
        message: "Role cannot be updated",
        statusCode: 403,
      });
    }

    // Pass updated props to the repository for persistence
    return await this.userRepository.updateUser(userId, updatedProps);
  }
}
