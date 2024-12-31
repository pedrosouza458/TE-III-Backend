import { Product } from "../entities/domain/product";
import { Stock } from "../entities/domain/stock";

export interface StockRepository {
  checkStock(stock: Stock): Promise<void>
  getStockById(stockId: string): Promise<void>
  deleteStock(stockId: string): Promise<void>
  updateStock(stockId: string, products: Product[]): Promise<void>
}
