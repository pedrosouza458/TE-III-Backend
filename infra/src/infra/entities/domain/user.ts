import { Entity } from "../core/domain/entity";
import { Order } from "./order";

export type UserProps = {
  name: string;
  email: string;
  password: string;
  role: string;
  approvedInDistributor: boolean;
  distributorId: string | null;
  orders: Order[];
  approvedOrders: Order[];
};

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id: string) {
    super(props, id);
  }

  static create(props: UserProps, id: string) {
    const product = new User(props, id);

    // Default values for optional fields
    props.orders = props.orders || [];
    props.approvedInDistributor = props.approvedInDistributor ?? false;
    props.approvedOrders = props.approvedOrders || [];
    props.distributorId = props.distributorId ?? null;

    return product;
  }

  toPlainObject() {
    return {
      id: this.id,
      ...this.props,
    };
  }

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public getPassword(): string {
    return this.props.password;
  }

  public get role(): string {
    return this.props.role;
  }

  public get approvedInDistributor(): boolean {
    return this.props.approvedInDistributor;
  }

  public get orders(): Order[] {
    return this.props.orders;
  }

  public get approvedOrders(): Order[] {
    return this.props.approvedOrders;
  }
}
