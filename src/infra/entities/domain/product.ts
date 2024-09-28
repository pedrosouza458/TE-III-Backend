import { Entity } from "../core/domain/entity";
import { Category } from "./category";

type ProductProps = {
  category: Category[],
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
  public get id(): string {
    return this._id;
  }
}