import { Message } from "../../../responses/response";
import { Error } from "../../../responses/error";
import { Success } from "../../../responses/success";
import { Distributor } from "../../entities/domain/distributor";
import { DistributorRepository } from "../distributor-repository";

export class InMemoryOrderRepository implements DistributorRepository {
  public distributor: Distributor[] = [];

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