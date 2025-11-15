export class UpdateProductPriceCommand {
  constructor(
    public readonly id: string,
    public readonly price: number
  ) { }
}
