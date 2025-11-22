import { DomainEvent } from "./bus/event/domain-event";

export abstract class AggregateRoot {
  private domainEvents: DomainEvent[] = [];

  protected record(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  pullDomainEvents(): DomainEvent[] {
    const events = [...this.domainEvents];
    this.domainEvents = [];

    return events;
  }
}