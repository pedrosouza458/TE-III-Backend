import { DistributorRepository } from "../distributor-repository";
import { Distributor, DistributorProps } from "../../entities/domain/distributor";
import { Message } from "../../../responses/response";
import { Success } from "../../../responses/success";
import { Error } from "../../../responses/error";
import { v4 as uuid } from 'uuid';

export class InMemoryDistributorRepository implements DistributorRepository {
  public distributor: Distributor[] = [];

  async createDistributor(distributor: Partial<DistributorProps>): Promise<Message> {
    try {

      const distributorProps: DistributorProps = {
        name: distributor.name ?? "Unknown Distributor",
        address: distributor.address ?? "No Address Provided",
        stockId: null,
        description: distributor.description ?? "No Description Provided",
        selledProducts: 0,
        accepted: false,
        orders: [],
      };

      const newDistributor = Distributor.create(distributorProps, uuid());
  
      this.distributor.push(newDistributor);
  
      return Success.create({
        message: "Distributor created successfully",
        statusCode: 200,
      });
    } catch (error) {
      return Error.create({
        message: "Failed to create distributor",
        statusCode: 400,
      });
    }
  }
  

  async acceptDistributor(distributorId: string): Promise<Message> {
    const distributor = this.distributor.find((d) => d.id === distributorId);
    if (distributor) {
      distributor.props.accepted = true;
      return Success.create({
        message: "Distributor accpeted",
        statusCode: 200,
      });
    }
    return Error.create({
      message: "Failed to accept distributor",
      statusCode: 400,
    });
  }

  async disacceptDistributor(distributorId: string): Promise<Message> {
    const distributor = this.distributor.find((d) => d.id === distributorId);
    if (distributor) {
      distributor.props.accepted = false;
      return Success.create({
        message: "Distributor disaccepted",
        statusCode: 200,
      });
    }
    return Error.create({
      message: "Failed to disaccepted distributor",
      statusCode: 400,
    });
  }
}
