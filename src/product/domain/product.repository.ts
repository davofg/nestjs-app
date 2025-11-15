import { Product } from './product.entity';
import { ProductId } from './value-object/product-id';

export interface ProductRepository {
  find(id: ProductId): Promise<Product | null>;

  save(product: Product): Promise<void>;
}
