import { Message } from "../../../../responses/response";
import { DistributorRepository } from "../../../repository/distributor-repository";
import { UserRepository } from "../../../repository/user-repository";

export class AcceptDistributor {
  constructor(private userRepository: UserRepository, private distributorRepostiory: DistributorRepository) {}

  async execute(adminId: string, distributorId: string): Promise<Message> {
    const checkAdmin = await this.userRepository.checkAdmin(adminId);

    if (checkAdmin.statusCode === 200) {
      const response = this.distributorRepostiory.acceptDistributor(distributorId);
      return response;
    }

    return checkAdmin;
  }
}
