import { Entity } from "../core/domain/entity";
import { Order } from "./order";

enum status {
  REJECTED,
  PENDING,
  APROVED,
}

export type DistributorProps = {
  name: string;
  address: string;
  stockId: string | null;
  description: string;
  selledProducts: number;
  accepted: boolean;
  orders: Order[] | [];
};

export class Distributor extends Entity<DistributorProps> {
  private constructor(props: DistributorProps, id: string) {
    super(props, id);
  }

  static create(props: DistributorProps, id: string) {
    const distributor = new Distributor(props, id);

    return distributor;
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string {
    return this.props.description;
  }

  public get address(): string {
    return this.props.address;
  }

  public get selledProducts(): number {
    return this.props.selledProducts;
  }

  public get accepted(): boolean {
    return this.props.accepted;
  }

  public get orders(): Order[] {
    return this.props.orders;
  }
}
