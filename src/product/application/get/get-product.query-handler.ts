import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductQuery } from './get-product.query';
import { ProductRepository } from '../../domain/product.repository';
import { ProductNotFoundException } from 'src/product/domain/exception/product-not-found.exception';
import { ProductId } from 'src/product/domain/value-object/product-id';
import { ProductResponse } from '../response/product-response';
import { Inject } from '@nestjs/common';

@QueryHandler(GetProductQuery)
export class GetProductQueryHandler implements IQueryHandler<GetProductQuery> {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductRepository
  ) {}

  async execute(query: GetProductQuery): Promise<ProductResponse> {
    const productId = new ProductId(query.id);
    const product = await this.repository.find(productId);

    if (!product) {
      throw new ProductNotFoundException(productId);
    }

    return ProductResponse.fromDomain(product);
  }
}
