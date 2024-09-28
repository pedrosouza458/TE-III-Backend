import { Error } from "../../../responses/error";
import { Message } from "../../../responses/response";
import { Success } from "../../../responses/success";
import { Admin } from "../../entities/domain/admin";
import { Category } from "../../entities/domain/category";
import { CategoryRepository } from "../category-repository";

export class InMemoryCategoryRepository implements CategoryRepository {
  public admin: Admin[] = [];
  public category: Category[] = [];

  async createCategory(category: Category): Promise<Message> {
    if(category){
      this.category.push(category)
      return Success.create({
        message: "Category created",
        statusCode: 201
      })
    }
    return Error.create({
      message: "Failed to create category",
      statusCode: 422
    })
  }

  async getCategory(categoryName?: string): Promise<Category[]> {
    if (categoryName) {
      const categories = this.category.filter((c) => c.name === categoryName);
      return categories;
    }
    return this.category;
  }
  
  async getAllCategories(): Promise<Category[]> {
    const categories = this.category;
    return categories;
  }

  async updateCategory(
    adminId: string,
    categoryId: string,
    props: string[]
  ): Promise<void> {}

  async deleteCategory(adminId: string, categoryId: string): Promise<void> {}
}
