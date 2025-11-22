import { Module } from '@nestjs/common';
import { UuidJsUuidGenerator } from './infrastructure/service/uuidjs-uuid-generator';
import { ClientsModule, Transport } from '@nestjs/microservices';

const RabbitMQClientModule = ClientsModule.register([
  {
    name: 'RABBITMQ_CONNECTION',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'products',
      queueOptions: {
        durable: true,
      },
    },
  },
]);

@Module({
  imports: [
    RabbitMQClientModule,
  ],
  providers: [
    {
      provide: 'UuidGenerator',
      useClass: UuidJsUuidGenerator,
    },
  ],
  exports: [
    'UuidGenerator',
    RabbitMQClientModule,
  ],
})

export class SharedModule { }