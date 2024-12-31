import { Entity } from "../core/domain/entity";
import { Product } from "./product";

export type CategoryProps = {
  name: string;
  products: Product[] | [];
}

export class Category extends Entity<CategoryProps> {
  private constructor(props: CategoryProps, id: string) {
    super(props, id);
  }

  static create(props: CategoryProps, id: string) {
    return new Category(props, id);
  }

  public get name(): string {
    return this.props.name;
  }

  public get products(): Product[] {
    return this.props.products;
  }
}
