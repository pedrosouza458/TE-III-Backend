import { Error } from "../../../responses/error";
import { Message } from "../../../responses/response";
import { Success } from "../../../responses/success";
import { Admin } from "../../entities/domain/admin";
import { Distributor } from "../../entities/domain/distributor";
import { AdminRepository } from "../admin-repository";

export class InMemoryAdminRepository implements AdminRepository {
  public admin: Admin[] = [];
  public distributor: Distributor[] = [];

  async createAdmin(admin: Admin): Promise<void> {
    this.admin.push(admin);
  }

  async deleteAdmin(adminId: string) {
    this.admin = this.admin.filter((a) => a.id !== adminId);
  }
  async checkAdmin(adminId: string): Promise<Message> {
    const check = this.admin.some((a) => a.id === adminId);
    if (check === true) {
      return Success.create({
        message: "Admin Authorized",
        statusCode: 200
      })
    }
    return Error.create({
      message: "Unauthorized",
      statusCode: 401
    })
  }

  async acceptDistributor(distributorId: string) {
    const distributor = this.distributor.find((d) => d.id === distributorId);

    distributor
      ? (distributor.props.accepted = true)
      : () => {
          // throw new Error(`Distributor with ID ${distributorId} not found`);
        };
  }

  async disacceptDistributor(distributorId: string) {
    const distributor = this.distributor.find((d) => d.id === distributorId);

    distributor
      ? (distributor.props.accepted = false)
      : () => {
          // throw new Error(`Distributor with ID ${distributorId} not found`);
        };
  }
}
