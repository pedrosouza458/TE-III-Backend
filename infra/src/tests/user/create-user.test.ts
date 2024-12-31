import { CreateUser } from '../../infra/application/use-cases/user/create-user';
import { UserRepository } from '../../infra/repository/user-repository';
import { UserProps } from '../../infra/entities/domain/user';

jest.mock('../../infra/repository/user-repository');

describe('Create admin', () => {
  let createUser: CreateUser;
  let mockUserRepository: UserRepository;

  beforeEach(() => {
    mockUserRepository = {
      createAdmin: jest.fn().mockResolvedValue({ message: 'User created', statusCode: 200 }),
    } as unknown as UserRepository;
    createUser = new CreateUser(mockUserRepository);
  });

  it('should create a user and return a success message', async () => {
    const userProps: UserProps = {
      name: 'John Doe',
      password: 'password123',
      email: 'john.doe@example.com',
      role: 'User',
      approvedInDistributor: false,
      approvedOrders: [],
      distributorId: null,
      orders: []
    };

    // Execute the method
    const response = await createUser.execute(userProps);

    expect(response).toEqual({ message: 'User created', statusCode: 200 });
    expect(mockUserRepository.createAdmin).toHaveBeenCalledWith(expect.any(Object)); // Check if createAdmin was called
  });
});
