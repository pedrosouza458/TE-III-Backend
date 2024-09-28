import { Category } from "../entities/domain/category";

export interface CategoryRepository {
  createCategory(category: Category[]): Promise<void>
  getCategory(): Promise<void>
  getAllCategories(): Promise<void>
  updateCategory(categoryId: string, props: string[]): Promise<void>
  deleteCategory(categoryId: string): Promise<void>
}