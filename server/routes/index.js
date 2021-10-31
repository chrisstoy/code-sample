/**
 * Define the routes
 */
const admin = require('./admin');
const users = require('./users');
const notes = require('./notes');

module.exports = (app) => {
  app.use('/admin', admin);
  app.use('/users', users);
  app.use('/notes', notes);
};
