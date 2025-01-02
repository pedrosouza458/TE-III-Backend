import { Message } from "../../responses/response";
import { Distributor } from "../entities/domain/distributor";

export interface DistributorRepository {
  createDistributor(distributor: Distributor): Promise<Message>;
  acceptDistributor(distributorId: string): Promise<Message>;
  disacceptDistributor(distributorId: string): Promise<Message>;
}