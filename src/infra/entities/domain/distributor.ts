import { Entity } from "../core/domain/entity";
import { Category } from "./category";
import { Order } from "./order";
import { Product } from "./product";

type DistributorProps = {
  name: string,
  brand: string,
  address: string,
  department: Category[],
  description: string,
  selledProducts: number,
  distributionDiscount: number,
  accepted: boolean,
  products: Product[],
  orders: Order[],
}

export class Distributor extends Entity<DistributorProps> {
    private constructor(props: DistributorProps, id?: string){
      super(props, id);
    }

    static create(props: DistributorProps, id?: string){
      const distributor = new Distributor(props);

      return distributor;
    }
    public get id(): string {
      return this._id;
    }
}