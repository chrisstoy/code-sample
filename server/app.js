/**
 * CodeSample server
 */
const express = require('express');
const bodyParser = require('body-parser');

const mountRoutes = require('./routes');

const app = express();
const port = 3000;

// parse application/json
app.use(bodyParser.json());

// load all of our routes
mountRoutes(app);

// listen for connections
const server = app.listen(port, () => {
  console.log(`CodeSample API server running on port ${server.address().port}.`);
});
