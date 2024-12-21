import { CategoryRepository } from "../../../repository/category-repository";

export class GetCategories {
  constructor(private categoryRepository: CategoryRepository) {}
  async execute() {
    const response = this.categoryRepository.getAllCategories;
    return response;
  }
}
