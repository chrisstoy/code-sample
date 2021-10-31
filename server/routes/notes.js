/**
 * Notes API
 */
const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

// export our router to be mounted by the parent application
module.exports = router;

/**
 * Return all notes for specified user
 */
router.get('/:user_id', async (request, response) => {
  const user_id = request.params.user_id;

  const { rows } = await db.query('SELECT id, title, last_update FROM sample.notes WHERE owner_id = $1', [user_id]);
  response.status(200).json(rows);
});

/**
 * Return requested note for user
 */
router.get('/:user_id/:note_id', async (request, response) => {
  const user_id = request.params.user_id;
  const note_id = request.params.note_id;

  const { rows } = await db.query('SELECT * FROM sample.notes WHERE owner_id = $1 AND id = $2', [user_id, note_id]);
  response.status(200).json(rows[0]);
});

/**
 * Create a new note
 */
router.put('/:user_id/:note_id', async (request, response) => {
  const owner_id = request.params.user_id;
  const note_id = request.params.note_id;

  const { title, text } = request.body;

  await db.query(
    `INSERT INTO sample.notes (id, owner_id, title, text, last_update) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP);`,
    [note_id, owner_id, title, text]
  );

  const { rows } = await db.query('SELECT * FROM sample.notes WHERE id = $1', [note_id]);
  response.status(200).json(rows[0]);
});

/**
 * Update an existing Note
 */
router.post('/:user_id/:note_id', async (request, response) => {
  const owner_id = request.params.user_id;
  const note_id = request.params.note_id;

  const { title, text } = request.body;

  await db.query(
    'UPDATE sample.notes SET title = $1, text = $2, last_update = CURRENT_TIMESTAMP WHERE owner_id = $3 AND id = $4',
    [title, text, owner_id, note_id]
  );

  const { rows } = await db.query('SELECT * FROM sample.notes WHERE owner_id = $1 AND id = $2', [owner_id, note_id]);
  response.status(200).json(rows[0]);
});

/**
 * Delete an existing note
 */
router.delete('/:user_id/:note_id', async (request, response) => {
  const owner_id = request.params.user_id;
  const note_id = request.params.note_id;

  const result = await db.query(`DELETE FROM sample.notes WHERE owner_id = $1 AND id = $2`, [owner_id, note_id]);
  response.status(200).send({ deleted: note_id });
});
