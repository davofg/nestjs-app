import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetProductQuery } from 'src/product/application/get/get-product.query';
import { ProductResponse } from 'src/product/application/response/product-response';

@Controller('products')
export class GetProductController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':productId')
  async get(@Param('productId') productId: string): Promise<ProductResponse> {
    return this.queryBus.execute(new GetProductQuery(productId));
  }
}
