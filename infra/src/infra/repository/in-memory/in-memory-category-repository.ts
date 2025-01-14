import { Error } from "../../../responses/error";
import { Message } from "../../../responses/response";
import { Success } from "../../../responses/success";
import { User } from "../../entities/domain/user";
import { Category } from "../../entities/domain/category";
import { CategoryRepository } from "../category-repository";

export class InMemoryCategoryRepository implements CategoryRepository {
  public admin: User[] = [];
  public category: Category[] = [];

  async createCategory(category: Category): Promise<Message> {
    try {
      if (category) {
        this.category.push(category);
        return Success.create({
          message: "Category created",
          statusCode: 201,
        });
      }
    } catch (error) {
      return Error.create({
        message: "Internal server error",
        statusCode: 500,
      });
    }
  }

  async getCategory(categoryName?: string): Promise<Category[] | Message> {
    try {
      if (categoryName) {
        const categories = this.category.filter((c) => c.name === categoryName);
        return categories;
      }
      return this.category;
    } catch (error) {
      return Error.create({
        message: "Internal server error",
        statusCode: 500,
      });
    }
  }

  async getAllCategories(): Promise<Category[] | Message> {
    try {
      const categories = this.category;
      return categories;
    } catch (error) {
      return Error.create({
        message: "Internal server error",
        statusCode: 500,
      });
    }
  }

  async updateCategory(
    adminId: string,
    categoryId: string,
    props: string[]
  ): Promise<void> {}

  async deleteCategory(adminId: string, categoryId: string): Promise<void> {}
}
