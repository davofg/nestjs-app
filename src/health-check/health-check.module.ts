import { Module } from '@nestjs/common';
import { HealthCheckController } from './infrastructure/controller/health-check.controller';

@Module({
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
