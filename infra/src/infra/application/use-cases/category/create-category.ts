import { Message } from "../../../../responses/response";
import { Category, CategoryProps } from "../../../entities/domain/category";
import { UserRepository } from "../../../repository/user-repository";
import { CategoryRepository } from "../../../repository/category-repository";

export class CreateCategory {
  constructor(
    private userRepository: UserRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async execute(adminId: string, { name }: CategoryProps): Promise<Message> {
    const checkAdmin = await this.userRepository.checkAdmin(adminId);

    if (checkAdmin.statusCode === 200) {
      const category = Category.create({ name });
      const response = await this.categoryRepository.createCategory(category);

      return response;
    }
    return checkAdmin;
  }
}
