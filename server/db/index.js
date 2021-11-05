const { Pool } = require('pg');

// the database is running on the same machine as we are, so use the same IP for host
const pool = new Pool({
  host: 'database',
  port: 5432,
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
