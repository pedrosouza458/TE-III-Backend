import { Entity } from "../core/domain/entity"
import { Batch } from "./Batch"

type OrderProps = {
  batches: Batch[],
  total: string,
  discountPercentage: number,
  accepted: boolean,
  delivered: boolean,
  createdAt: Date,
}

export class Order extends Entity<OrderProps> {
  private constructor(props: OrderProps, id?: string){
    super(props, id);
  }

  static create(props: OrderProps, id?: string){
    const order = new Order(props);

    return order;
  }
}