export class ProductName {
  public constructor(private readonly _value: string) {
    if (_value.trim().length === 0) {
      throw new Error('Product name cannot be empty.');
    }

    if (_value.length > 255) {
      throw new Error('Product name is too long.');
    }
  }

  get value(): string {
    return this._value;
  }
}
