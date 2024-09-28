import { Category } from "../../../../entities/domain/category";

type CreateCategoryRequest = {
  name: string;
};

export class CreateCategory {
  execute({ name }: CreateCategoryRequest) {
    const category = Category.create({
      name
    })
    return category
  }
}
