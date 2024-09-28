import { Admin, AdminProps } from "../../../entities/domain/admin";
import { Category, CategoryProps } from "../../../entities/domain/category";
import { AdminRepository } from "../../../repository/admin-repository";
import { CategoryRepository } from "../../../repository/category-repository";

export class CreateCategory {
  constructor(
    private adminRepository: AdminRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async execute(adminId: string, { name }: CategoryProps): Promise<void> {
    const category = Category.create({ name });
    const checkAdmin = this.adminRepository.checkAdmin(adminId);

    (await checkAdmin) === true
      ? await this.categoryRepository.createCategory(adminId, category)
      : () => {
          throw new Error("Invalid admin id");
        };
  }
}
