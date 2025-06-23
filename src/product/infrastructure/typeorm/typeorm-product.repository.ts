import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductRepository } from "src/product/domain/product.repository";
import { TypeOrmProduct } from "./typeorm-product.entity";
import { Repository } from "typeorm";
import { Product } from "src/product/domain/product.entity";
import { ProductId } from "src/product/domain/value-object/product-id";
import { ProductName } from "src/product/domain/value-object/product-name";
import { ProductPrice } from "src/product/domain/value-object/product-price";

@Injectable()
export class TypeOrmProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(TypeOrmProduct)
    private readonly repository: Repository<TypeOrmProduct>
  ) { }

  async find(id: ProductId): Promise<Product | null> {
    const product = await this.repository.findOneBy({ id: id.value });

    if (!product) {
      return null;
    }

    return new Product(
      new ProductId(product.id),
      new ProductName(product.name),
      new ProductPrice(product.price),
    );
  }
}
