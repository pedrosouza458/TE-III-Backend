import { CreateUser } from '../../infra/application/use-cases/user/create-user';
import { GetUserById } from '../../infra/application/use-cases/user/get-user-by.id';
import { UserRepository } from '../../infra/repository/user-repository';
import { User, UserProps } from '../../infra/entities/domain/user';
import { Message } from '../../responses/response';
import { v4 as uuid } from 'uuid';
import { Error } from '../../responses/error';

describe('GetUserById use case', () => {
  let createUser: CreateUser;
  let getUserById: GetUserById;
  let mockUserRepository: UserRepository;

  let createdUserId: string;

  beforeEach(() => {
    // Mocking the repository
    mockUserRepository = {
      createUser: jest.fn().mockResolvedValue({
        message: 'User created',
        statusCode: 200,
        data: '123e4567-e89b-12d3-a456-426614174000',
      }),
      getUserById: jest.fn().mockImplementation((id: string) => {
        if (id === createdUserId) {
          return {
            id: createdUserId,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'User',
            approvedInDistributor: false,
            orders: [],
            approvedOrders: [],
          };
        }
        return Error.create({
          message: 'User not found',
          statusCode: 404,
        });
      }),
    } as unknown as UserRepository;

    // Initialize use case classes
    createUser = new CreateUser(mockUserRepository);
    getUserById = new GetUserById(mockUserRepository);
  });

  it('should create a user and get the user by id', async () => {
    // Create a new user
    const userProps: Partial<UserProps> = {
      name: 'John Doe',
      password: 'password123',
      email: 'john.doe@example.com',
      role: 'User',
    };

    const createResponse = await createUser.execute(userProps);

    // Extract the user id from the response
    createdUserId = createResponse.data;

    expect(createResponse).toEqual({
      message: 'User created',
      data: createdUserId,
      statusCode: 200,
    });

    // Now, test the GetUserById functionality
    const user = await getUserById.execute(createdUserId);

    expect(user).toEqual({
      id: createdUserId,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'User',
      approvedInDistributor: false,
      orders: [],
      approvedOrders: [],
    });
    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(createdUserId);
  });

  it('should return error if user not found', async () => {
    // Try to fetch a non-existing user
    const nonExistingUserId = 'non-existing-id';
    const user = await getUserById.execute(nonExistingUserId);

    expect(user).toEqual({
      message: 'User not found',
      statusCode: 404,
    });
  });
});
