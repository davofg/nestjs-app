import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HealthCheckController } from './infrastructure/controller/health-check.controller';
import { GetAppStatusQueryHandler } from './application/get-app-status/get-app-status.query-handler';
import { AppStatusGetter } from './domain/service/app-status-getter';

@Module({
  imports: [CqrsModule],
  controllers: [HealthCheckController],
  providers: [GetAppStatusQueryHandler, AppStatusGetter],
})
export class HealthCheckModule { }
