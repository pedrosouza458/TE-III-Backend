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

  async acceptDistributor(distributorId: string) {
    const distributor = this.distributor.find((d) => d.id === distributorId);

    distributor
      ? (distributor.props.accepted = true)
      : () => {
          throw new Error(`Distributor with ID ${distributorId} not found`);
        };
  }

  async disacceptDistributor(distributorId: string){
    const distributor = this.distributor.find((d) => d.id === distributorId);

    distributor
      ? (distributor.props.accepted = false)
      : () => {
          throw new Error(`Distributor with ID ${distributorId} not found`);
        };
  }

}
