import { Message } from "../../../../responses/response";
import { User, UserProps } from "../../../entities/domain/user";
import { UserRepository } from "../../../repository/user-repository";

export class CreateUser {
  constructor(private adminRepository: UserRepository) {}

  async execute({ name, password, email, role }: UserProps): Promise<Message> {
    const user = User.create({
      name,
      password,
      email,
      role,
      aprovedInDistributor: false,
      distributorId: null,
      orders: [],
      aprovedOrders: [],
    });

    const response = await this.adminRepository.createAdmin(user);
    return response;
  }
}
