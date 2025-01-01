import { UserRepository } from '../../../infra/repository/user-repository';
import { UserProps } from '../../../infra/entities/domain/user';
import { CreateAdmin } from '../../../infra/application/use-cases/user/admin/create-admin';

jest.mock('../../../infra/repository/user-repository');

describe('Create admin use-case', () => {
  let createAdmin: CreateAdmin;
  let mockUserRepository: UserRepository;

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

    expect(response).toEqual({ message: 'Admin created', statusCode: 200 });
    expect(mockUserRepository.createAdmin).toHaveBeenCalledWith(expect.any(Object)); // Check if createAdmin was called
  });


  it('should not be able to create a user and error message', async () => {
    // using any to force fail
    const userProps: Partial<any> = {
      test: "testing",
      password: 'password123',
      email: 'john.doe@example.com',
      role: 'Admin',
    };

    // Execute the method
    const response = await createAdmin.execute(userProps);

    expect(response).toEqual({ message: 'Failed to create admin', statusCode: 422 });
    expect(mockUserRepository.createAdmin).toHaveBeenCalledWith(expect.any(Object)); // Check if createAdmin was called
  });

});
