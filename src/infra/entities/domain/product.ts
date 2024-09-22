import { Entity } from "../core/domain/entity";
import { Category } from "./category";

type ProductProps = {
  id: string,
  category: Category[],
  price: string,
  amount: number,
}

export class Product extends Entity<ProductProps> {
  private constructor(props: ProductProps, id?: string){
    super(props, id);
  }

  public create(props: ProductProps, id?: string){
    const product = new Product(props);

    return product;
  }
}