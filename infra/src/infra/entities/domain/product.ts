import { Entity } from "../core/domain/entity";
import { Category } from "./category";

type ProductProps = {
  categories: Category[];
  name: string;
  description: string;
  price: string;
  amount: number;
};

export class Product extends Entity<ProductProps> {
  private constructor(props: ProductProps, id: string) {
    super(props, id);
  }

  static create(props: ProductProps, id: string) {
    const product = new Product(props, id);

    return product;
  }

  public get categories(): Category[] {
    return this.props.categories;
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string {
    return this.props.description
  }

  public get price(): string {
    return this.props.price
  }

  public get amount(): number {
    return this.props.amount
  }

}
