import { Entity } from "../core/domain/entity"
import { Product } from "./product"

type CategoryProps = {
  id: string,
  name: string,
  products: Product[]
}

export class Category extends Entity<CategoryProps> {
  private constructor(props: CategoryProps, id?: string){
    super(props, id);
  }

  public create(props: CategoryProps, id?: string){
    const category = new Category(props);

    return category;
  }
}