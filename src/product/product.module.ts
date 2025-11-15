import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductController } from './infrastructure/controller/product.controller';
import { GetProductQueryHandler } from './application/get/get-product.query-handler';
import { TypeOrmProductRepository } from './infrastructure/typeorm/typeorm-product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmProductMapper } from './infrastructure/typeorm/typeorm-product.mapper';
import { UpdateProductPriceCommandHandler } from './application/update-price/update-product-price.command-handler';
import { TypeOrmProductEntity } from './infrastructure/typeorm/typeorm-product.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([TypeOrmProductEntity])
  ],
  controllers: [
    ProductController
  ],
  providers: [
    TypeOrmProductMapper,
    GetProductQueryHandler, 
    UpdateProductPriceCommandHandler, 
    {
      provide: 'ProductRepository',
      useClass: TypeOrmProductRepository
    }
  ],
  exports: [],
})
export class ProductModule {}
