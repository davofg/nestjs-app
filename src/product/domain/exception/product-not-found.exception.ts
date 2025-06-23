import { DomainException } from "src/shared/domain/exception/domain-exception";
import { ProductId } from "../value-object/product-id";

export class ProductNotFoundException extends DomainException {
  constructor(id: ProductId) {
    super(`Product with ID ${id.value} was not found.`);
  }
}
