import { Entity } from "../core/domain/entity";
import { Category } from "./category";
import { Order } from "./order";
import { Product } from "./product";

enum status {
  REJECTED,
  PENDING,
  APROVED,
}

type DistributorProps = {
  name: string;
  address: string;
  status: status;
  stockId: string;
  department: Category[];
  description: string;
  selledProducts: number;
  accepted: boolean;
  products: Product[];
  orders: Order[];
};

export class Distributor extends Entity<DistributorProps> {
  private constructor(props: DistributorProps, id?: string) {
    super(props, id);
  }

  static create(props: DistributorProps, id?: string) {
    const distributor = new Distributor(props, id);

    return distributor;
  }

  public get name(): string {
    return this.name;
  }

  public get description(): string {
    return this.description;
  }

  public get brand(): string {
    return this.brand;
  }

  public get address(): string {
    return this.address;
  }

  public get department(): string[] {
    return this.department;
  }

  public get selledProducts(): number {
    return this.selledProducts;
  }

  public get selled(): number {
    return this.selled;
  }

  public get distributionDiscount(): number {
    return this.distributionDiscount;
  }

  public get accepted(): boolean {
    return this.accepted;
  }

  public get products(): string[] {
    return this.products;
  }

  public get orders(): string[] {
    return this.orders;
  }
}
