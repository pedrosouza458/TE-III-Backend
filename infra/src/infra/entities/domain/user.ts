import { Entity } from "../core/domain/entity";
import { Order } from "./order";

export type UserProps = {
  name: string;
  email: string;
  password: string;
  role: string;
  aprovedInDistributor: boolean;
  distributorId: string | null;
  orders: Order[];
  aprovedOrders: Order[];
};

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  static create(props: UserProps, id?: string) {
    const product = new User(props, id);

    return product;
  }

  public get name(): string[] {
    return this.name;
  }

  public get email(): string {
    return this.email;
  }

  // no get password

  public get role(): string {
    return this.role;
  }

  public get approvedInDistributor(): boolean {
    return this.approvedInDistributor;
  }

  public get orders(): Order[] {
    return this.orders;
  }

  public get approvedOrders(): Order[] {
    return this.approvedOrders;
  }
}
