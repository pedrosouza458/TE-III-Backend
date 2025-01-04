import { v4 as uuid } from "uuid"; 
import { Message } from "../../../../responses/response";
import { Distributor, DistributorProps } from "../../../entities/domain/distributor";
import { DistributorRepository } from "../../../repository/distributor-repository";

export class CreateDistributor {
  constructor(private distributorRepository: DistributorRepository) {}

  async execute(distributorProps: Partial<DistributorProps>): Promise<Message> {
    const distributorData = Distributor.create(distributorProps as DistributorProps, uuid());

    const response = await this.distributorRepository.createDistributor(distributorData);
    return response;
  }
}
