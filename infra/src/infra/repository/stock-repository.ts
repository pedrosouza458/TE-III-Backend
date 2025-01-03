import { Message } from "../../responses/response";
import { Product } from "../entities/domain/product";
import { Stock } from "../entities/domain/stock";

export interface StockRepository {
  checkStock(stock: Stock): Promise<Message>
  getStockById(stockId: string): Promise<Message>
  deleteStock(stockId: string): Promise<Message>
  updateStock(stockId: string, products: Product[]): Promise<Message>
}
