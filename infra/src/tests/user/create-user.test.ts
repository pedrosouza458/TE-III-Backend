import { CreateUser } from '../../infra/application/use-cases/user/create-user';
import { UserRepository } from '../../infra/repository/user-repository';
import { UserProps } from '../../infra/entities/domain/user';

jest.mock('../../infra/repository/user-repository');

describe('Create user use-case', () => {
  let createUser: CreateUser;
  let mockUserRepository: UserRepository;
  let createdUserId: string;

  beforeEach(async () => {
    mockUserRepository = {
      createUser: jest.fn().mockResolvedValue({ message: 'User created', statusCode: 200, data: '123e4567-e89b-12d3-a456-426614174000' }),
    } as unknown as UserRepository;

    createUser = new CreateUser(mockUserRepository);

    // Run the createUser method and store the created user ID
    const userProps: Partial<UserProps> = {
      name: 'John Doe',
      password: 'password123',
      email: 'john.doe@example.com',
      role: 'User',
    };

    const response = await createUser.execute(userProps);
    createdUserId = response.data;
  });

  it('should create a user and return a success message', async () => {
    const userProps: Partial<UserProps> = {
      name: 'John Doe',
      password: 'password123',
      email: 'john.doe@example.com',
      role: 'User',
    };

    const response = await createUser.execute(userProps);

    expect(response).toEqual({ message: 'User created', data: createdUserId, statusCode: 200 });
    // expect(mockUserRepository.createUser).toHaveBeenCalledWith(expect.objectContaining({
    //   name: 'John Doe',
    //   password: 'password123',
    //   email: 'john.doe@example.com',
    //   role: 'User', // role should be passed as is
    //   approvedInDistributor: false,  // Default value
    //   distributorId: null,           // Default value
    //   orders: [],                    // Default value
    //   approvedOrders: [],           // Default value
    // }));
  });
});
