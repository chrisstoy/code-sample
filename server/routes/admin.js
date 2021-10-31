/**
 * Administration API
 * 		GET /admin/users	- returns list of all users in the system
		DELETE /admin/users/{{user-id}} - delete a user and all of their notes from the system
		POST /admin/users/{{user-id}}/reset-password	- force resetting a user's password
		POST /admin/users/{{user-id}}/logout - force logging out a user
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
 * Return list of all users
 */
router.get('/users', async (request, response) => {
  const { rows } = await db.query('SELECT * FROM sample.users');
  response.status(200).json(rows);
});
