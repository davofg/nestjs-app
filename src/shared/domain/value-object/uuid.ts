import { v7 as uuidv7, validate } from 'uuid';

export class Uuid {
  public constructor(
    private readonly _value: string
  ) {
    if (!validate(this._value)) {
      throw new Error(`Invalid UUID: ${this._value}`);
    }
  }

  static generate<T extends Uuid>(this: new (value: string) => T): T {
    return new this(uuidv7());
  }

  get value(): string {
    return this._value;
  }
}
