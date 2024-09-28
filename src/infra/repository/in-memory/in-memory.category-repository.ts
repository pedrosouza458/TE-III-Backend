import { Admin } from "../../entities/domain/admin";
import { Category } from "../../entities/domain/category";
import { CategoryRepository } from "../category-repository";

export class InMemoryCategoryRepository implements CategoryRepository {
  public admin: Admin[] = [];
  public category: Category[] = [];

  async createCategory(adminId: string, category: Category): Promise<void> {
    let response = adminId !== null
      ? this.category.push(category)
      : () => {
          throw new Error("Invalid AdminId");
        };
  }

  async deleteAdmin(adminId: string): Promise<void> {}

  async getAllCategories(): Promise<Category[]>{}

  async updateCategory(adminId: string, categoryId: string, props: string[]): Promise<void>{}

  async deleteCategory(adminId: string, categoryId: string): Promise<void>{}

}
