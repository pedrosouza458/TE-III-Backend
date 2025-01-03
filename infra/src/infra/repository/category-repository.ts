import { Category } from "../entities/domain/category";
import { Message } from "../../responses/response";

export interface CategoryRepository {
  createCategory(category: Category): Promise<Message>
  getCategory(categoryName: string): Promise<Category[] | Message>
  getAllCategories(): Promise<Category[] | Message>
  updateCategory(adminId: string, categoryId: string, props: string[]): Promise<void>
  deleteCategory(adminId: string, categoryId: string): Promise<void>
}