import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD ,
  database: process.env.POSTGRES_DB ,
  entities: ['dist/src/**/infrastructure/typeorm/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false, // never use true in production
});
