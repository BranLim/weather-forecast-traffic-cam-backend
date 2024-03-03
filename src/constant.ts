import * as dotenv from 'dotenv';
dotenv.config();

export const APP_PORT = process.env.APP_PORT || 3001;
export const DATABASE_USER = process.env.POSTGRES_USER;
export const DATABASE_PASSWORD = process.env.POSTGRES_PASSWORD;