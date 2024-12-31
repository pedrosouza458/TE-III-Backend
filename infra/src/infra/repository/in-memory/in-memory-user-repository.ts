import { Error } from "../../../responses/error";
import { Message } from "../../../responses/response";
import { Success } from "../../../responses/success";
import { User, UserProps } from "../../entities/domain/user";
import { UserRepository } from "../user-repository";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class InMemoryUserRepository implements UserRepository {
  public user: User[] = [];

  async getUserById(userId: string): Promise<Partial<UserProps> | Message> {
    try {
      const user = this.user.find((c) => c.id === userId);

      if (!user) {
        return Error.create({
          message: "User not found",
          statusCode: 404,
        });
      }

      const userResult: Partial<UserProps> = {
        name: user.name, 
        email: user.email,
        role: user.role,
        approvedInDistributor: user.approvedInDistributor,
        orders: user.orders,
        approvedOrders: user.approvedOrders,
      };

      return userResult;
    } catch (error) {
      return Error.create({
        message: "Internal server error",
        statusCode: 500,
      });
    }
  }

  async createUser(user: User): Promise<Message> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.getPassword(), saltRounds);

      const newUserProps: UserProps = {
        ...user.props,
        role: "User",
        password: hashedPassword,
      };

      if (!newUserProps) {
        return Error.create({
          message: "Failed to create User",
          statusCode: 422,
        });
      }

      const newUser = User.create(newUserProps, uuid());

      this.user.push(newUser);

      return Success.create({
        message: "User created",
        statusCode: 200,
      });
    } catch (error) {
      return Error.create({
        message: "Internal Server error",
        statusCode: 500,
      });
    }
  }

  async createAdmin(user: User): Promise<Message> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.getPassword(), saltRounds);

      const newAdminProps: UserProps = {
        ...user.props,
        role: "Admin",
        password: hashedPassword,
      };

      if (!newAdminProps) {
        return Error.create({
          message: "Failed to create admin",
          statusCode: 422,
        });
      }

      const newUser = User.create(newAdminProps, uuid());

      this.user.push(newUser);

      return Success.create({
        message: "Admin created",
        statusCode: 200,
      });
    } catch (error) {
      return Error.create({
        message: "Internal server error",
        statusCode: 500,
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

      if (updatedProps.role && updatedProps.role !== existingUser.props.role) {
        return Error.create({
          message: "Role cannot be updated",
          statusCode: 403,
        });
      }

      const updatedUserProps: UserProps = {
        ...existingUser.props,
        ...updatedProps,
        role: existingUser.props.role,
      };

      const updatedUser = User.create(updatedUserProps, userId);
      this.user[userIndex] = updatedUser;

      return Success.create({
        message: "User updated successfully",
        statusCode: 200,
      });
    } catch (error) {
      return Error.create({
        message: "Internal server error",
        statusCode: 500,
      });
    }
  }

  async deleteUser(userId: string): Promise<Message> {
    try {
      this.user = this.user.filter((a) => a.id !== userId);
      return Success.create({
        message: "User deleted",
        statusCode: 200,
      });
    } catch (error) {
      return Error.create({
        message: "Failed to delete user",
        statusCode: 500,
      });
    }
  }

  async checkAdmin(adminId: string): Promise<Message> {
    try {
      const check = this.user.some(
        (a) => a.id === adminId && a.role === "Admin"
      );
      if (check) {
        return Success.create({
          message: "Authorized",
          statusCode: 200,
        });
      }
      return Error.create({
        message: "Unauthorized",
        statusCode: 500,
      });
    } catch (error) {
      return Error.create({
        message: "Interal server error",
        statusCode: 500,
      });
    }
  }

  async switchingUserRole(userId: string): Promise<Message> {
    try {
      const user = this.user.find((a) => a.id === userId);
      if (user) {
        user.props.role = user.props.role === "User" ? "Admin" : "User";
        return Success.create({
          message: `Switched ${user.name} user role to ${user.role}`,
          statusCode: 200,
        });
      }
      return Error.create({
        message: "User not found",
        statusCode: 404,
      });
    } catch (error) {
      return Error.create({
        message: "Interal server error",
        statusCode: 500,
      });
    }
  }
}
