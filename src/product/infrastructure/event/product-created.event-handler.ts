import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductCreatedEvent } from 'src/product/domain/event/product-created.event';

@Injectable()
@EventsHandler(ProductCreatedEvent)
export class ProductCreatedEventHandler implements IEventHandler<ProductCreatedEvent> {
  constructor(
    @Inject('RABBITMQ_CONNECTION') private readonly client: ClientProxy,
  ) {}

  async handle(event: ProductCreatedEvent) {
    await this.client.connect();

    const routingKey = ProductCreatedEvent.EVENT_NAME; // 'product.created'
    
    const messagePayload = {
      id: event.id,
      name: event.name,
      price: event.price,
      occurredOn: event.occurredOn,
      type: routingKey,
    };

    console.log(`[RabbitMQ] Publicando ${routingKey} en el broker.`);
    this.client.emit(routingKey, messagePayload).toPromise();
  }
}