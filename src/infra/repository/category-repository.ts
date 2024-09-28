import { Category } from "../entities/domain/category";

export interface CategoryRepository {
  createCategory(adminId: string, category: Category[]): Promise<void>
  getCategory(): Promise<void>
  getAllCategories(): Category[]
  updateCategory(adminId: string, categoryId: string, props: string[]): Promise<void>
  deleteCategory(adminId: string, categoryId: string): Promise<void>
}