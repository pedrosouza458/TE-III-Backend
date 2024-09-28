import { Category } from "../../../entities/domain/category";
import { CategoryRepository } from "../../../repository/category-repository";

export class GetCategories {
  constructor(private categoryRepository: CategoryRepository) {}


}
