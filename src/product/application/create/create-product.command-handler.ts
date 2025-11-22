import { Inject } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { ProductRepository } from "src/product/domain/product.repository";
import { ProductId } from "src/product/domain/value-object/product-id";
import { ProductPrice } from "src/product/domain/value-object/product-price";
import { CreateProductCommand } from "./create-product.command";
import { Product } from "src/product/domain/product.entity";
import { ProductName } from "src/product/domain/value-object/product-name";
import { UuidGenerator } from "src/shared/domain/service/uuid-generator";

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    @Inject('UuidGenerator')
    private readonly uuidGenerator: UuidGenerator,
    @Inject('ProductRepository')
    private readonly repository: ProductRepository,
    private readonly eventBus: EventBus
  ) {}
  
  async execute(command: CreateProductCommand): Promise<void> {
    const product = Product.create(
      new ProductId(this.uuidGenerator.generate()),
      new ProductName(command.name),
      new ProductPrice(command.price)
    );

    for (const event of product.pullDomainEvents()) {
      this.eventBus.publish(event);
    }

    await this.repository.save(product);
  }
}