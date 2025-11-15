import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateProductPriceCommand } from "./update-product-price.command";
import { Inject } from "@nestjs/common";
import { ProductRepository } from "src/product/domain/product.repository";
import { ProductId } from "src/product/domain/value-object/product-id";
import { ProductNotFoundException } from "src/product/domain/exception/product-not-found.exception";
import { Product } from "src/product/domain/product.entity";
import { ProductPrice } from "src/product/domain/value-object/product-price";

@CommandHandler(UpdateProductPriceCommand)
export class UpdateProductPriceCommandHandler implements ICommandHandler<UpdateProductPriceCommand> {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductRepository
  ) {}
  
  async execute(command: UpdateProductPriceCommand): Promise<void> {
    const productId = new ProductId(command.id);
    const product = await this.repository.find(productId);

    if (!product) {
      throw new ProductNotFoundException(productId);
    }

    product.changePrice(new ProductPrice(command.price));

    await this.repository.save(product);
  }
}