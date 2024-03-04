import { Sequelize, Options } from 'sequelize';
import dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export const sequelize = new Sequelize({
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_NAME,
  dialect: 'postgres',
});