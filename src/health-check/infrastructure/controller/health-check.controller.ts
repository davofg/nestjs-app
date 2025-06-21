import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAppStatusQuery } from 'src/health-check/application/get-app-status/get-app-status.query';

@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly queryBus: QueryBus) { }

  @Get()
  async getStatus() {
    return this.queryBus.execute(new GetAppStatusQuery);
  }
}
