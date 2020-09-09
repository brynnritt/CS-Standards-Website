/*const http = require('http');
const handleRequest = require('./src/handle-request');
const app = require('./src/app');
require('./src/templates');
require('./src/database');

const port = 3000;

var server = http.createServer(handleRequest);

server.listen(port, function(){
  console.log("Server is listening on port " + port);
});*/

const http = require('http');
const app = require('./src/app');
require('./src/database');
require('./src/templates');

const port = 3000;

// Start listening for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});