import mysql from 'mysql2/promise';

let pool;

export async function getConnection() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.TIDB_HOST,
      port: Number(process.env.TIDB_PORT || 4000),
      user: process.env.TIDB_USER,
      password: process.env.TIDB_PASSWORD,
      database: process.env.TIDB_DATABASE,
      ssl: { rejectUnauthorized: true, minVersion: 'TLSv1.2' },
      connectionLimit: 1,
      maxIdle: 1,
      enableKeepAlive: true,
    });
  }
  return pool;
}
