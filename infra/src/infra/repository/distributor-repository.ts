import { Message } from "../../responses/response";

export interface DistributorRepository {
  acceptDistributor(distributorId: string): Promise<Message>;
  disacceptDistributor(distributorId: string): Promise<Message>;
}