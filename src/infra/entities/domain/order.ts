import { Entity } from "../core/domain/entity"
import { Batch } from "./Batch"

type OrderProps = {
  id: string,
  batches: Batch[],
  total: string,
  discountPercentage: number,
  accepted: boolean,
}

export class Order extends Entity<OrderProps> {
  private constructor(props: OrderProps, id?: string){
    super(props, id);
  }

  public create(props: OrderProps, id?: string){
    const order = new Order(props);

    return order;
  }
}