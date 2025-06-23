import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetProductController } from './infrastructure/controller/product.controller';
import { GetProductQueryHandler } from './application/get/get-product.query-handler';
import { TypeOrmProductRepository } from './infrastructure/typeorm/typeorm-product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmProduct } from './infrastructure/typeorm/typeorm-product.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([TypeOrmProduct])
  ],
  controllers: [GetProductController],
  providers: [
    GetProductQueryHandler, 
    TypeOrmProductRepository,
    {
      provide: 'ProductRepository',
      useClass: TypeOrmProductRepository
    },
  ],
  exports: [
    {
      provide: 'ProductRepository',
      useClass: TypeOrmProductRepository
    },
  ],
})
export class ProductModule {}
