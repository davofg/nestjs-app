import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductRepository } from "src/product/domain/product.repository";
import { TypeOrmProductMapper } from "./typeorm-product.mapper";
import { Repository } from "typeorm";
import { Product } from "src/product/domain/product.entity";
import { ProductId } from "src/product/domain/value-object/product-id";
import { ProductName } from "src/product/domain/value-object/product-name";
import { ProductPrice } from "src/product/domain/value-object/product-price";
import { TypeOrmProductEntity } from "./typeorm-product.entity";

@Injectable()
export class TypeOrmProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(TypeOrmProductEntity)
    private readonly repository: Repository<TypeOrmProductEntity>,
    private readonly mapper: TypeOrmProductMapper
  ) { }

  async find(id: ProductId): Promise<Product | null> {
    const product = await this.repository.findOneBy({ id: id.value });

    if (!product) {
      return null;
    }

    return this.mapper.toDomain(product);
  }

  async save(product: Product): Promise<void> {
    await this.repository.save(this.mapper.fromDomain(product));
  }
}
