const Pool = require('pg').Pool;
const dotenv = require('dotenv').config();
const { PG_USER, PG_PASSWORD, PG_API, PG_PORT, PG_DB } = process.env;

/** Connecting to database **/
const pool = new Pool({
  user: PG_USER,
  password: PG_PASSWORD,
  host: PG_API,
  port: PG_PORT,
  database: PG_DB
})


module.exports = pool;