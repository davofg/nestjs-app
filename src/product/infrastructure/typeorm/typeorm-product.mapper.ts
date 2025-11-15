import { Injectable } from '@nestjs/common';
import { Product } from 'src/product/domain/product.entity';
import { ProductId } from 'src/product/domain/value-object/product-id';
import { ProductName } from 'src/product/domain/value-object/product-name';
import { ProductPrice } from 'src/product/domain/value-object/product-price';
import { TypeOrmProductEntity } from './typeorm-product.entity';
import { TypeOrmMapper } from 'src/shared/infrastructure/typeorm/typeorm.mapper';

@Injectable()
export class TypeOrmProductMapper implements TypeOrmMapper<Product, TypeOrmProductEntity> {
    public fromDomain(product: Product): TypeOrmProductEntity {
        const entity = new TypeOrmProductEntity();
        entity.id = product.id.value;
        entity.name = product.name.value;
        entity.price = product.price.value;
        return entity;
    }

    public toDomain(product: TypeOrmProductEntity): Product {
        return new Product(
            new ProductId(product.id),
            new ProductName(product.name),
            new ProductPrice(product.price),
        );
    }
}
