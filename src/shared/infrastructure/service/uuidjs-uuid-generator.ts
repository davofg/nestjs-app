import { v7 as uuidv7 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { UuidGenerator } from 'src/shared/domain/service/uuid-generator';

@Injectable()
export class UuidJsUuidGenerator implements UuidGenerator {
  generate(): string {
    return uuidv7();
  }
}
