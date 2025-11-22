import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductController } from './infrastructure/controller/product.controller';
import { GetProductQueryHandler } from './application/get/get-product.query-handler';
import { TypeOrmProductRepository } from './infrastructure/typeorm/typeorm-product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmProductMapper } from './infrastructure/typeorm/typeorm-product.mapper';
import { UpdateProductPriceCommandHandler } from './application/update-price/update-product-price.command-handler';
import { TypeOrmProductEntity } from './infrastructure/typeorm/typeorm-product.entity';
import { CreateProductCommandHandler } from './application/create/create-product.command-handler';
import { SharedModule } from 'src/shared/shared.module';
import { ProductCreatedEventHandler } from './infrastructure/event/product-created.event-handler';

const CommandHandlers = [
  CreateProductCommandHandler, 
  UpdateProductPriceCommandHandler
];

const QueryHandlers = [
  GetProductQueryHandler
];

const EventHandlers = [
  ProductCreatedEventHandler
];

@Module({
  imports: [
    CqrsModule,
    SharedModule,
    TypeOrmModule.forFeature([TypeOrmProductEntity])
  ],
  controllers: [
    ProductController
  ],
  providers: [
    TypeOrmProductMapper,
    {
      provide: 'ProductRepository',
      useClass: TypeOrmProductRepository
    },
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers
  ],
  exports: [],
})
export class ProductModule {}
