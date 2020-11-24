import pg from "pg";

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_SCHEMA,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
});

export default pool;

// Add schema code
