import { Entity } from "../core/domain/entity"
import { Product } from "./product"

type StockProps = {
  id: string,
  products: Product[],
  total: number,
}

export class Stock extends Entity<StockProps> {
  private constructor(props: StockProps, id?: string){
    super(props, id);
  }

  public create(props: StockProps, id?: string){
    const stock = new Stock(props);

    return stock;
  }
}


