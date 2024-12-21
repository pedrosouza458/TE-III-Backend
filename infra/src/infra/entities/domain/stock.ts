import { Entity } from "../core/domain/entity"
import { Product } from "./product"

type StockProps = {
  products: Product[],
  total: number,
}

export class Stock extends Entity<StockProps> {
  private constructor(props: StockProps, id?: string){
    super(props, id);
  }

  static create(props: StockProps, id?: string){
    const stock = new Stock(props, id);
   
    return stock;
  }
  
  public get products(): string[]{
    return this.products;
  }

  public get total(): string {
    return this.total
  }

}


