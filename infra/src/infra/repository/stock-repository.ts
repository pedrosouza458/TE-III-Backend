import { Message } from "../../responses/response";
import { Product } from "../entities/domain/product";
import { Stock } from "../entities/domain/stock";

export interface StockRepository {
  checkStock(stock: Stock): Promise<Message>
  getStockById(stockId: string): Promise<void>
  deleteStock(stockId: string): Promise<void>
  updateStock(stockId: string, products: Product[]): Promise<void>
}
