const Pool = require('pg').Pool;

const { PG_USER, PG_PASSWPRD, PG_API, PG_PORT, PG_DB } = process.env;


const pool = new Pool({
  user: PG_USER,
  password: PG_PASSWPRD,
  host: PG_API,
  port: PG_PORT,
  database: PG_DB
})


module.exports = pool;