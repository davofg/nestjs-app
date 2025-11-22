export abstract class DomainEvent {
  constructor(
    public readonly eventId: string,
    public readonly occurredOn: Date = new Date(),
  ) {}
}