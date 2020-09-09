const bcrypt = require('bcrypt');
const templates = require('../templates');
const db = require('../database');
const serveError = require('../serve-error');
const sessions = require('../sessions');

/** @function createUser
 * An endpoint for creating a new user.  The request
 * should have an object as its body parameter with 
 * username, password, and passwordConfirmation set.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function createUser(req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var organization = req.body.organization;
  var role = req.body.role;
  var email = req.body.email;
  var password = req.body.password;
  var passwordConfirmation = req.body.passwordConfirmation;
  
  if(password !== passwordConfirmation) return failure(req, res, "Your password and password confirmation must match.");
  
  var existingUser = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if(existingUser) return failure(req, res, `The email "${email}" is already taken.`);
  
  const passes = 10;
  bcrypt.hash(password, passes, (err, hash) => {
    if(err) return serveError(req, res, 500, err);
    
    var info = db.prepare(`INSERT INTO users (
      first,
      last,
      organization,
      role,
      email,
      crypted_password
    ) values (
      ?, 
      ?, 
      ?, 
      ?, 
      ?, 
      ?
    );`).run(firstName, lastName, organization, role, email, hash);
    
    if(info.changes === 1) success(req, res, info.lastInsertRowid);
    else failure(req, res, "An error occurred.  Please try again.");
  });
}

module.exports = createUser;


/** @function success 
 * A helper method invoked when user creation is successful.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {integer} userID - the id of the user in the database
 */
function success(req, res, userID) {
  // Retrieve the user 
  var user = db.prepare("SELECT * FROM users WHERE id = ?").get(userID);
  // Create session
  var sid = sessions.create(user);
  // Set session cookie
  res.setHeader("Set-Cookie", `SID=${sid}; Secure; HTTPOnly`);
  // Redirect to home page
  res.statusCode = 302;
  res.setHeader("Location", "/forum/topics");
  res.end();
}

/** @function failure 
 * A helper method invoked when user creation fails.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {string} errorMessage - a message to display to the user
 */
function failure(req, res, errorMessage) {
  if(!errorMessage) errorMessage = "There was an error processing your request.  Please try again."
  var form = templates["signup.html"]({
    errorMessage: errorMessage
  });
  var html = templates["website-layout.html"]({
    layout: form
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}