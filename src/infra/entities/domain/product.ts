import { Entity } from "../core/domain/entity";
import { Category } from "./category";

type ProductProps = {
  categories: Category[],
  brand: string,
  price: string,
  amount: number,
}

export class Product extends Entity<ProductProps> {
  private constructor(props: ProductProps, id?: string){
    super(props, id);
  }

  static create(props: ProductProps, id?: string){
    const product = new Product(props);

    return product;
  }
  
}