import { Entity } from "../core/domain/entity"
import { Product } from "./product"

type BatchProps = {
  id: string,
  title: string,
  products: Product[],
  total: number
}

export class Batch extends Entity<BatchProps>{
  private constructor(props: BatchProps, id?: string){
    super(props, id);
  }

  public create(props: BatchProps, id?: string){
    const batch = new Batch(props);

    return batch;
  }
}