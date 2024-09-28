import { Message } from "../../../../responses/response";
import { Category, CategoryProps } from "../../../entities/domain/category";
import { AdminRepository } from "../../../repository/admin-repository";
import { CategoryRepository } from "../../../repository/category-repository";

export class CreateCategory {
  constructor(
    private adminRepository: AdminRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async execute(adminId: string, { name }: CategoryProps): Promise<Message> {
    const checkAdmin = await this.adminRepository.checkAdmin(adminId);

    if (checkAdmin.statusCode === 200) {
      const category = Category.create({ name });
      const response = await this.categoryRepository.createCategory(category);

      return response;
    }
    return checkAdmin;
  }
}
