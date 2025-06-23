import { Module } from '@nestjs/common';
import { UuidJsUuidGenerator } from './infrastructure/service/uuidjs-uuid-generator';

@Module({
  providers: [
    {
      provide: 'UuidGenerator',
      useClass: UuidJsUuidGenerator,
    },
  ],
  exports: ['UuidGenerator'],
})

export class SharedModule { }
