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
        return Object.assign(new TypeOrmProductEntity(), {
            id: product.id.value,
            name: product.name.value,
            price: product.price.value,
        });
    }

    public toDomain(product: TypeOrmProductEntity): Product {
        return new Product(
            new ProductId(product.id),
            new ProductName(product.name),
            new ProductPrice(product.price),
        );
    }
}
