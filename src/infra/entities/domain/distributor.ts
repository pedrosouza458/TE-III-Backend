import { Entity } from "../core/domain/entity";
import { Category } from "./category";
import { Order } from "./order";
import { Product } from "./product";

type DistributorProps = {
  name: string,
  department: Category[],
  description: string,
  selledProducts: number,
  distributionDiscount: number,
  products: Product[],
  orders: Order[],
}

export class Distributor extends Entity<DistributorProps> {
    private constructor(props: DistributorProps, id?: string){
      super(props, id);
    }

    public create(props: DistributorProps, id?: string){
      const distributor = new Distributor(props);

      return distributor;
    }
}