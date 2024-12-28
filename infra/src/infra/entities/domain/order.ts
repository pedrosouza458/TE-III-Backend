import { Entity } from "../core/domain/entity"
import { Batch } from "./Batch"

type OrderProps = {
  name: string,
  address: string,
  userId: string,
  batches: Batch[],
  total: string,
  distributorId: string,
  approvedByAdminId?: string,
  accepted: boolean,
  delivered: boolean,
  createdAt: Date,
  upadtedAt: Date,
}

export class Order extends Entity<OrderProps> {
  private constructor(props: OrderProps, id?: string){
    super(props, id);
  }

  static create(props: OrderProps, id?: string){
    const order = new Order(props, id);

    return order;
  }

  public get batches(): string[] {
    return this.batches
  }

  public get total(): string {
    return this.total
  }

  public get accepted(): boolean {
    return this.accepted
  }

  public get delivered(): boolean {
    return this.delivered
  }

  public get createdAt(): Date {
    return this.createdAt
  }
  
}