import { Category } from "./category";
import { Order } from "./order";
import { Product } from "./product";

type DistributorProps = {
  id: string,
  name: string,
  department: Category[],
  description: string,
  selledProducts: number,
  distributionDiscount: number,
  products: Product[],
  orders: Order[],
}

export class Distributor {
    
}