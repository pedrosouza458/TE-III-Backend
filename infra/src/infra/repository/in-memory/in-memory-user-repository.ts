import { Error } from "../../../responses/error";
import { Message } from "../../../responses/response";
import { Success } from "../../../responses/success";
import { User, UserProps } from "../../entities/domain/user";
import { UserRepository } from "../user-repository";
import bcrypt from "bcrypt";

export class InMemoryUserRepository implements UserRepository {
  public user: User[] = [];

  async getUserById(userId: string): Promise<Partial<UserProps> | Message> {
    try {
      const user = this.user.find((c) => c.id === userId);

      let userResult = {
        name: user?.props.name,
        email: user?.props.email,
        password: user?.props.password,
        role: user?.props.role,
        aprovedInDistributor: user?.props.aprovedInDistributor,
        distributorId: user?.props.distributorId,
        orders: user?.props.orders,
        aprovedOrders: user?.props.aprovedOrders,
      };
      return userResult;
    } catch (error) {
      return Error.create({
        message: "Failed to create user",
        statusCode: 400,
      });
    }
  }

  async createUser(user: User): Promise<Message> {
    try {
      const saltRounds = 10;
      let hashedpassword = await bcrypt.hash(user.props.password, saltRounds);
      const newUserProps = {
        ...user.props,
        role: "User",
        password: hashedpassword,
      };

      const newUser = User.create(newUserProps, user.id);

      this.user.push(newUser);

      return Success.create({
        message: "User created",
        statusCode: 200,
      });
    } catch (error) {
      return Error.create({
        message: "Failed to create user",
        statusCode: 400,
      });
    }
  }

  async createAdmin(admin: User): Promise<Message> {
    try {
      const saltRounds = 10;
      let hashedpassword = await bcrypt.hash(admin.props.password, saltRounds);
      const newAdminProps = {
        ...admin.props,
        role: "Admin",
        password: hashedpassword,
      };

      const newAdmin = User.create(newAdminProps, admin.id);

      this.user.push(newAdmin);

      return Success.create({
        message: "Admin created",
        statusCode: 200,
      });
    } catch (error) {
      return Error.create({
        message: "Failed to create admin",
        statusCode: 400,
      });
    }
  }

  async loginUser(userName: string, userPassword: string): Promise<void> {}
  async logoutUser(): Promise<void> {}

  async updateUser(
    userId: string,
    updatedProps: Partial<UserProps>
  ): Promise<Message> {
    try {
      // Find the user by ID
      const userIndex = this.user.findIndex((u) => u.id === userId);
      if (userIndex === -1) {
        return Error.create({
          message: "User not found",
          statusCode: 404,
        });
      }

      const existingUser = this.user[userIndex];

      // Prevent role from being updated
      if (updatedProps.role && updatedProps.role !== existingUser.props.role) {
        return Error.create({
          message: "Role cannot be updated",
          statusCode: 403,
        });
      }

      // Merge updated properties while maintaining the original role
      const updatedUserProps: UserProps = {
        ...existingUser.props,
        ...updatedProps,
        role: existingUser.props.role, // Ensure role is unchanged
      };

      // Create a new User instance with updated properties
      const updatedUser = User.create(updatedUserProps, userId);
      this.user[userIndex] = updatedUser;

      return Success.create({
        message: "User updated successfully",
        statusCode: 200,
      });
    } catch (error) {
      return Error.create({
        message: "Failed to update user",
        statusCode: 400,
      });
    }
  }

  async deleteUser(userId: string): Promise<Message> {
    try {
      this.user = this.user.filter((a) => a.id !== userId);
      return Success.create({
        message: "Admin deleted",
        statusCode: 200,
      });
    } catch (error) {
      return Error.create({
        message: "Failed to delete admin",
        statusCode: 200,
      });
    }
  }

  async checkAdmin(adminId: string): Promise<Message> {
    const check = this.user.some((a) => a.id === adminId && a.role === "Admin");
    if (check === true) {
      return Success.create({
        message: "Authorized",
        statusCode: 200,
      });
    }
    return Error.create({
      message: "Unauthorized",
      statusCode: 401,
    });
  }

  // async switchingUserRole(userId): Promise<Message> {}
}
