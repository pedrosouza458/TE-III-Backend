import { Entity } from "../core/domain/entity"
import { Order } from "./order"
import { Product } from "./product"

type BatchProps = {
  title: string,
  products: Product[],
  orders?: Order[],
  quantity: number,
  total: number,
  expire_date: Date,
  manufactureDate: Date,
}

export class Batch extends Entity<BatchProps>{
  private constructor(props: BatchProps, id?: string){
    super(props, id);
  }

  static create(props: BatchProps, id?: string){
    const batch = new Batch(props, id);

    return batch;
  }

  public get title(): string{
    return this.title;
  }

  public get products(): string[]{
    return this.products;
  }

  public get total(): string{
    return this.total;
  }

}
