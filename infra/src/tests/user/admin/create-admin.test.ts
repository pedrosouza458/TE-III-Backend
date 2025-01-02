import { UserRepository } from '../../../infra/repository/user-repository';
import { UserProps } from '../../../infra/entities/domain/user';
import { CreateAdmin } from '../../../infra/application/use-cases/user/admin/create-admin';

describe('Create admin use-case', () => {
  let createAdmin: CreateAdmin;
  let mockUserRepository: UserRepository;
  let createdUserId: string;

  beforeEach(() => {
    mockUserRepository = {
      createAdmin: jest.fn().mockResolvedValue({ message: 'Admin created', statusCode: 200 }),
    } as unknown as UserRepository;
    createAdmin = new CreateAdmin(mockUserRepository);
  });

  it('should create a user and return a success message', async () => {
    const userProps: Partial<UserProps> = {
      name: 'John Doe',
      password: 'password123',
      email: 'john.doe@example.com',
      role: 'Admin',
    };

    // Execute the method
    const response = await createAdmin.execute(userProps);

    const adminId = response.data

    expect(response).toEqual({ message: 'Admin created', data: adminId, statusCode: 200 });
  });

  // all user error checks are equal in admin, so i just create the create-admin method in test.
});
