import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetProductQuery } from 'src/product/application/get/get-product.query';
import { ProductResponse } from 'src/product/application/response/product-response';
import { UpdateProductPriceRequest } from '../request/update-product-price.request';
import { UpdateProductPriceCommand } from 'src/product/application/update-price/update-product-price.command';
import { CreateProductCommand } from 'src/product/application/create/create-product.command';
import { CreateProductRequest } from '../request/create-product.request';

@Controller('products')
export class ProductController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @Get(':productId')
  async get(@Param('productId') productId: string): Promise<ProductResponse> {
    return this.queryBus.execute(new GetProductQuery(productId));
  }

  @Post()
  async create(
    @Body() body: CreateProductRequest,
  ): Promise<void> {
    await this.commandBus.execute(
      new CreateProductCommand(body.name, body.price),
    );
  }

  @Patch(':productId/price')
  async updatePrice(
    @Param('productId') productId: string,
    @Body() body: UpdateProductPriceRequest,
  ): Promise<void> {
    await this.commandBus.execute(
      new UpdateProductPriceCommand(productId, body.price),
    );
  }
}
