const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'codesample',
  database: 'code_sample',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

/**
 * Operations we can perform on the database
 */
module.exports = {
  query: (text, params) => pool.query(text, params),
};
