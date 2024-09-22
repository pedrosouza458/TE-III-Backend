import { Entity } from "../core/domain/entity"
import { Product } from "./product"

type CategoryProps = {
  name: string,
  products?: Product[]
}

export class Category extends Entity<CategoryProps> {
  private constructor(props: CategoryProps, id?: string){
    super(props, id);
  }

  static create(props: CategoryProps, id?: string){
    const category = new Category(props);

    return category;
  }
}