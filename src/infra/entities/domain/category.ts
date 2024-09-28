import { Entity } from "../core/domain/entity";
import { Product } from "./product";

export type CategoryProps = {
  name: string;
  products?: Product[];
};

export class Category extends Entity<CategoryProps> {
  private constructor(props: CategoryProps, id?: string) {
    super(props, id);
  }

  static create(props: CategoryProps, id?: string) {
    return new Category(props, id); // Pass id to the constructor
  }

  public get name(): string {
    return this.props.name; // Access props to get the name
  }

  public get products(): Product[] | undefined {
    return this.props.products; // Access props to get the products
  }
}
