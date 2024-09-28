import { Category } from "../../../entities/domain/category";
import { CategoryRepository } from "../../../repository/category-repository";

export class GetCategories {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    const categories = this.categoryRepository.getAllCategories();
    
    return categories;
  }
}