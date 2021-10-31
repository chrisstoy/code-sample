/**
 * Users API
 */
const Router = require('express-promise-router');
const db = require('../db');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// export our router to be mounted by the parent application
module.exports = router;

/**
 * Return the requested user
 */
router.get('/user/:id', async (request, response) => {
  const id = request.params.id;

  const { rows } = await db.query('SELECT * FROM sample.users WHERE id = $1', [id]);
  response.status(200).json(rows[0]);
});

/**
 * Create a new user
 */
router.put('/user/:id', async (request, response) => {
  const id = request.params.id;
  const { first_name, last_name, email } = request.body;

  await db.query(
    `INSERT INTO sample.users (id, first_name, last_name, email, is_admin, last_login) VALUES ($1, $2, $3, $4, false, CURRENT_TIMESTAMP);`,
    [id, first_name, last_name, email]
  );

  const { rows } = await db.query('SELECT * FROM sample.users WHERE id = $1;', [id]);
  response.status(200).json(rows[0]);
});

/**
 * Update an existing user
 */
router.post('/user/:id', async (request, response) => {
  const id = request.params.id;

  console.log(`resuest.body: `, request.body);

  const { first_name, last_name, email } = request.body;

  await db.query('UPDATE sample.users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4', [
    first_name,
    last_name,
    email,
    id,
  ]);

  const { rows } = await db.query('SELECT * FROM sample.users WHERE id = $1;', [id]);
  response.status(200).json(rows[0]);
});

/**
 * Return the requested user
 */
router.delete('/user/:id', async (request, response) => {
  const id = request.params.id;

  const result = await db.query(`DELETE FROM sample.users WHERE id = $1`, [id]);
  response.status(200).send({ deleted: id });
});
