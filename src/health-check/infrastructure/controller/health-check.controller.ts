import { Controller, Get } from '@nestjs/common';
import { AppStatusGetter } from '../../application/get-app-status/app-status-getter';
import { AppStatus } from '../../domain/app-status';

@Controller('health-check')
export class HealthCheckController {
  private readonly appStatusGetter = new AppStatusGetter();

  @Get()
  getStatus(): AppStatus {
    return this.appStatusGetter.get();
  }
}
