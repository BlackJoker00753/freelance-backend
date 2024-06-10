import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from "process";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'balarama.db.elephantsql.com',
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER || 'ukgdgdrh',
  password: process.env.POSTGRES_PASSWORD || '9wJRmhJgEZxHzYoPLH9HiuUJO-trWU0Q',
  database: process.env.POSTGRES_DB || 'ukgdgdrh',
  autoLoadEntities: true,
  synchronize: true, // Note: Set this to false in production
};
