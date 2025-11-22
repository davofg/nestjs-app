import { AggregateRoot } from 'src/shared/domain/aggregate-root';
import { ProductId } from './value-object/product-id';
import { ProductName } from './value-object/product-name';
import { ProductPrice } from './value-object/product-price';
import { ProductCreatedEvent } from './event/product-created.event';

export class Product extends AggregateRoot {
  public constructor(
    private readonly _id: ProductId,
    private _name: ProductName,
    private _price: ProductPrice,
  ) { 
    super();
  }

  get id(): ProductId {
    return this._id;
  }

  get name(): ProductName {
    return this._name;
  }

  get price(): ProductPrice {
    return this._price;
  }

  public static create(
    id: ProductId,
    name: ProductName,
    price: ProductPrice
  ): Product {
    const product = new Product(id, name, price);

    product.record(new ProductCreatedEvent(id.value, name.value, price.value));

    return product;
  }

  public changePrice(price: ProductPrice): void {
    this._price = price;
  }
}
