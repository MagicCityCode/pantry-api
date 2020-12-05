import pg from "pg";

const pool = new pg.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASS,
  port: Number(process.env.PGPORT),
});

// pg.Result // Interesting this doesn't work; documentation seems it would...revisit

export default pool;

// Move to config soon
