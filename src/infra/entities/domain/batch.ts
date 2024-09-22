import { Entity } from "../core/domain/entity"
import { Product } from "./product"

type BatchProps = {
  title: string,
  products: Product[],
  total: number
}

export class Batch extends Entity<BatchProps>{
  private constructor(props: BatchProps, id?: string){
    super(props, id);
  }

  static create(props: BatchProps, id?: string){
    const batch = new Batch(props);

    return batch;
  }
}
