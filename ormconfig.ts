import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const connectionSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 3306,
  synchronize: false,
  logging: true,
  logger: 'debug',
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/db/migrations/**/*.ts'],
  subscribers: ['src/db/subscribers/**/*.ts'],
});
