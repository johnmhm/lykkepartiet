// Read .env file
const environment = process.env.NODE_ENV || 'development';
require('dotenv').config({path: `./.env.${environment}`});

// Load error logging
const Rollbar = require('rollbar');
const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR,
  captureUncaught: true,
  captureUnhandledRejections: true
});

// log a generic message and send to rollbar
rollbar.log('Hello world!');

// Import
const routes = require('./src/routes.js');

// Variables
const express = require('express');
const port = 3001; // Note: must match port of the "proxy" URL in app/package.json
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json())

routes.map(app);

const path = require('path')
app.use(express.static('app')); // Note: serve app as static assets
app.get('*', function (request, response) {
  response.sendFile(path.join(__dirname, './app/index.html'));
})

// Initate webserver
function listeningHandler () {
  console.log(`Server is listening on port ${port}. Environment set to ${environment}.`);
}
app.listen(port, listeningHandler);
