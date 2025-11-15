import { ProductId } from './value-object/product-id';
import { ProductName } from './value-object/product-name';
import { ProductPrice } from './value-object/product-price';

export class Product {
  public constructor(
    private readonly _id: ProductId,
    private _name: ProductName,
    private _price: ProductPrice,
  ) {}

  static create(id: ProductId, name: ProductName, price: ProductPrice): Product {
    return new Product(id, name, price);
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

  public changePrice(price: ProductPrice): void {
    this._price = price;
  }
}
