import { Message } from "../../../../../responses/response";
import { User, UserProps } from "../../../../entities/domain/user";
import { UserRepository } from "../../../../repository/user-repository";

export class CreateAdmin {
  constructor(private adminRepository: UserRepository) {}

  async execute({ name, password, email }: UserProps): Promise<Message> {
    const admin = User.create({
      name,
      password,
      email,
      role: "Admin",
      aprovedInDistributor: false,
      distributorId: null,
      orders: [],
      aprovedOrders: [],
    });

    const response = await this.adminRepository.createAdmin(admin);
    return response;
  }
}
