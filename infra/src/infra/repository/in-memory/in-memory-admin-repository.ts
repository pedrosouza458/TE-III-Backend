import { Error } from "../../../responses/error";
import { Message } from "../../../responses/response";
import { Success } from "../../../responses/success";
import { Admin } from "../../entities/domain/admin";
import { Distributor } from "../../entities/domain/distributor";
import { AdminRepository } from "../admin-repository";
import bcrypt from "bcrypt";

export class InMemoryAdminRepository implements AdminRepository {
  public admin: Admin[] = [];
  public distributor: Distributor[] = [];

  async createAdmin(admin: Admin): Promise<Message> {
    try {
      const saltRounds = 10;
      let hashedpassword = await bcrypt.hash(admin.props.password, saltRounds);
      const newAdminProps = {
        ...admin.props,
        password: hashedpassword,
      };

      const newAdmin = Admin.create(newAdminProps, admin.id);

      this.admin.push(newAdmin);

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

  async loginAdmin(adminName: string, adminPassword: string): Promise<void> {}
  async logoutAdmin(): Promise<void> {};
  async  updateAdmin(adminId: string, props: Admin): Promise<void> {};

  async deleteAdmin(adminId: string): Promise<Message> {
    try {
      this.admin = this.admin.filter((a) => a.id !== adminId);
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
    const check = this.admin.some((a) => a.id === adminId);
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
