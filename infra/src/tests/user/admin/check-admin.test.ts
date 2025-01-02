import { CheckAdmin } from "../../../infra/application/use-cases/user/admin/check-admin";
import { CreateUser } from "../../../infra/application/use-cases/user/create-user";
import { UserProps } from "../../../infra/entities/domain/user";
import { UserRepository } from "../../../infra/repository/user-repository";

describe("CheckAdmin use case", () => {
  let createUser: CreateUser;
  let checkAdmin: CheckAdmin;
  let mockUserRepository: UserRepository;

  beforeEach(() => {
    mockUserRepository = {
      createUser: jest.fn().mockImplementation(async (userProps: Partial<UserProps>) => {
        if (userProps.role === "Admin") {
          return {
            message: "User created",
            statusCode: 200,
            data: "123e4567-e89b-12d3-a456-426614174000", // Admin user ID
          };
        } else {
          return {
            message: "User created",
            statusCode: 200,
            data: "123e4567-e89b-12d3-a456-426614174001", // Non-admin user ID
          };
        }
      }),
      checkAdmin: jest.fn().mockImplementation(async (adminId: string) => {
        if (adminId === "123e4567-e89b-12d3-a456-426614174000") {
          return {
            message: "Authorized",
            statusCode: 200,
          };
        }
        return {
          message: "Unauthorized",
          statusCode: 500,
        };
      }),
    } as unknown as UserRepository;
    createUser = new CreateUser(mockUserRepository);
    checkAdmin = new CheckAdmin(mockUserRepository);
  });

  it("should return 'Authorized' when the user is an admin", async () => {
    // Mock the checkAdmin method to return an authorized response
    const userProps: Partial<UserProps> = {
      name: "John Doe",
      password: "password123",
      email: "john.doe@example.com",
      role: "Admin",
    };

    // Execute the method
    const createdUserId = await createUser.execute(userProps);

    const userId = createdUserId.data;

    const response = await checkAdmin.execute(userId);

    expect(response).toEqual({
      message: "Authorized",
      statusCode: 200,
    });
    expect(mockUserRepository.checkAdmin).toHaveBeenCalledWith(userId);
  });

  it("should return 'Unauthorized' when the user is not an admin", async () => {
    const userProps: Partial<UserProps> = {
      name: "John Doe",
      password: "password123",
      email: "john.doe@example.com",
    };

    // Execute the method
    const createdUserId = await createUser.execute(userProps);

    const userId = createdUserId.data;

    const response = await checkAdmin.execute(userId);

    expect(response).toEqual({
      message: "Unauthorized",
      statusCode: 500,
    });
    expect(mockUserRepository.checkAdmin).toHaveBeenCalledWith(userId);
  });
});
