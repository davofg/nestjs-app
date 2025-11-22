import { DomainEvent } from "src/shared/domain/bus/event/domain-event";

export class ProductCreatedEvent extends DomainEvent {
  static EVENT_NAME = "product.created";

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
  ) {
    super(id);
  }

  eventName(): string {
    return ProductCreatedEvent.EVENT_NAME;
  }
}