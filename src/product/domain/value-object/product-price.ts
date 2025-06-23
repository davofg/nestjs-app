export class ProductPrice {
  public constructor(private readonly _value: number) {
    if (isNaN(_value) || _value < 0) {
      throw new Error('Product price must be a non-negative number.');
    }
  }

  get value(): number {
    return this._value;
  }
}
