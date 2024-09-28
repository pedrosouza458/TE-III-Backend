import { Category } from "../../../entities/domain/category";
import { CategoryRepository } from "../../../repository/category-repository";

export class GetCategory {
  constructor(private categoryRepository: CategoryRepository) {}
  async execute(categoryName: string): Promise<Category[]> {
    const categories = this.categoryRepository.getCategory(categoryName);

    return categories;
  }
}
