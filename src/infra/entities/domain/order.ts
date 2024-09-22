import { Batch } from "./Batch"

type OrderProps = {
  id: string,
  batches: Batch[],
  total: string,
  discount: number,
  accepted: boolean,
}

export class Order {
  
}