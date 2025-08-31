import dotenv from 'dotenv';
import { createPool } from 'mysql2/promise';
dotenv.config();

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  connectionLimit: Number(process.env.DB_CONNECTION_POOL) || 10
});

export default pool;
