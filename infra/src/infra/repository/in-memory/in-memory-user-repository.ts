import { Error } from "../../../responses/error";
import { Message } from "../../../responses/response";
import { Success } from "../../../responses/success";
import { User } from "../../entities/domain/user";
import { Distributor } from "../../entities/domain/distributor";
import { UserRepository } from "../user-repository";
import bcrypt from "bcrypt";

export class InMemoryUserRepository implements UserRepository {
  public user: User[] = [];
  public distributor: Distributor[] = [];

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
  async updateUser(userId: string, props: User): Promise<void> {}

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

  async acceptDistributor(distributorId: string): Promise<Message> {
    const distributor = this.distributor.find((d) => d.id === distributorId);
    if (distributor) {
      distributor.props.accepted = true;
      return Success.create({
        message: "Distributor accpeted",
        statusCode: 200,
      });
    }
    return Error.create({
      message: "Failed to accept distributor",
      statusCode: 400,
    });
  }

  async disacceptDistributor(distributorId: string): Promise<Message> {
    const distributor = this.distributor.find((d) => d.id === distributorId);
    if (distributor) {
      distributor.props.accepted = false;
      return Success.create({
        message: "Distributor disaccepted",
        statusCode: 200,
      });
    }
    return Error.create({
      message: "Failed to disaccepted distributor",
      statusCode: 400,
    });
  }
}
