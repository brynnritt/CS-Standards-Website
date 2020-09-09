const sessions = require('../sessions');

/** @function destroySession 
 * This endpoint logs a user out of the website by 
 * destroying thier session.
 * @param {http.IncomingRequest} req - The request object 
 * @param {http.ServerResponse} res - the response object 
 */
function destroySession(req, res) {
  var match = /SID=([^;\s]+)/.exec(req.headers.cookie);
  if(match) sessions.remove(match[1]);
  
  res.setHeader("Set-Cookie", `SID=; Secure; HTTPOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
  
  res.statusCode = 302;
  res.setHeader("Location", "/forum/topics");
  res.end();
}

module.exports = destroySession;