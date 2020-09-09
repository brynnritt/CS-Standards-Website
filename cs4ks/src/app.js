const express = require('express');

const serveStandards = require('./endpoints/serve-standards');
const serveForum = require('./endpoints/serve-forum');

// Middleware
const loadBody = require('./middleware/load-body');
const basicAuth = require('./middleware/basic-auth');
const loadSession = require('./middleware/load-session');

// Endpoints
const newTopic = require('./endpoints/new-topic');
const createTopic = require('./endpoints/create-topic');
const showTopic = require('./endpoints/show-topic');

const newPost = require('./endpoints/new-post');
const createPost = require('./endpoints/create-post');
const showPost = require('./endpoints/show-post');

const newUser = require('./endpoints/new-user.js');
const createUser = require('./endpoints/create-user');

const newSession = require('./endpoints/new-session');
const createSession = require('./endpoints/create-session');
const destroySession = require('./endpoints/destroy-session');


/** @module app 
 * The express application for our site
 */
var app = express();

app.use(loadSession);

app.get('/standards.html', serveStandards);
app.get('/forum/topics', serveForum);

app.get('/forum/topics/new', newTopic);
app.get('/forum/topics/:topicID/posts/new', newPost);

app.post('/forum/topics', loadBody, createTopic);
app.post('/forum/topics/:topicID/posts', loadBody, createPost);

app.get('/forum/topics/:topicID', showTopic);
app.get('/forum/topics/:topicID/posts/:postID', showPost);

app.get("/forum/signup", newUser);
app.get('/forum/signin', newSession);
app.get("/signout", destroySession);

app.post("/forum/signup", loadBody, createUser);
app.post("/forum/signin", loadBody, createSession);

app.use(express.static('public'));

module.exports = app;