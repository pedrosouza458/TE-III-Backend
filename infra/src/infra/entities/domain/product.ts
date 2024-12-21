import { Entity } from "../core/domain/entity";
import { Category } from "./category";

type ProductProps = {
  categories: Category[];
  name: string;
  description: string;
  brand: string;
  price: string;
  amount: number;
};

export class Product extends Entity<ProductProps> {
  private constructor(props: ProductProps, id?: string) {
    super(props, id);
  }

  static create(props: ProductProps, id?: string) {
    const product = new Product(props, id);

    return product;
  }

  public get categories(): string[] {
    return this.categories;
  }

  public get name(): string {
    return this.name;
  }

  public get description(): string {
    return this.description
  }

  public get brand(): string {
    return this.brand
  }

  public get price(): string {
    return this.price
  }

  public get amount(): string {
    return this.amount
  }

}
