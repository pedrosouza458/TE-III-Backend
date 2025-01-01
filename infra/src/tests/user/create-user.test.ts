import { CreateUser } from "../../infra/application/use-cases/user/create-user";
import { UserRepository } from "../../infra/repository/user-repository";
import { UserProps } from "../../infra/entities/domain/user";

jest.mock("../../infra/repository/user-repository");

describe("Create user use-case", () => {
  let createUser: CreateUser;
  let mockUserRepository: UserRepository;
  let userId: string;

  beforeEach(async () => {
    mockUserRepository = {
      createUser: jest.fn().mockResolvedValue({
        message: "User created",
        statusCode: 200,
        data: "123e4567-e89b-12d3-a456-426614174000",
      }),
    } as unknown as UserRepository;
    createUser = new CreateUser(mockUserRepository);
  });

  it("should create a user and return a success message", async () => {
    const userProps: Partial<UserProps> = {
      name: "John Doe",
      password: "password123",
      email: "john.doe@example.com",
      role: "Admin",
    };

    // Execute the method
    const response = await createUser.execute(userProps);

    const userId = response.data;

    expect(response).toEqual({
      message: "User created",
      data: userId,
      statusCode: 200,
    });

    expect(mockUserRepository.createUser).toHaveBeenCalledWith(
      expect.any(Object)
    ); 
  });

  // all user error checks are equal in admin, so i just create the create-admin method in test.

  it("should fail when email does not contain '@'", async () => {
    const userProps: Partial<UserProps> = {
      name: "John Doe",
      email: "johndoedomain.com", // Invalid email
      password: "password123",
    };

    await expect(createUser.execute(userProps)).rejects.toThrow(
      "Invalid email format"
    );
  });

  it("should fail when email does not provide all required fields", async () => {
    const userProps: Partial<UserProps> = {
      name: "John Doe",
      // email not provided
      password: "password123",
      role: "User",
    };

    await expect(createUser.execute(userProps)).rejects.toThrow(
      "Name, email and password are required"
    );
  });
});
