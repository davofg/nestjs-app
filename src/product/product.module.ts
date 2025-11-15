import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductController } from './infrastructure/controller/product.controller';
import { GetProductQueryHandler } from './application/get/get-product.query-handler';
import { TypeOrmProductRepository } from './infrastructure/typeorm/typeorm-product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmProduct } from './infrastructure/typeorm/typeorm-product.entity';
import { UpdateProductPriceCommandHandler } from './application/update-price/update-product-price.command-handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([TypeOrmProduct])
  ],
  controllers: [
    ProductController
  ],
  providers: [
    GetProductQueryHandler, 
    {
      provide: 'ProductRepository',
      useClass: TypeOrmProductRepository
    },
    UpdateProductPriceCommandHandler, 
    {
      provide: 'ProductRepository',
      useClass: TypeOrmProductRepository
    }
  ],
  exports: [],
})
export class ProductModule {}
