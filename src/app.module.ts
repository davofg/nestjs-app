import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    HealthCheckModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
