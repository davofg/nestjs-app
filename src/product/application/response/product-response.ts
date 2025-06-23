import { Product } from "src/product/domain/product.entity";

export class ProductResponse {
  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
  ) {}

  static fromDomain(product: Product): ProductResponse {
    return new ProductResponse(
      product.id.value,
      product.name.value,
      product.price.value,
    );
  }
}
