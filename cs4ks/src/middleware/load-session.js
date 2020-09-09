const sessions = require('../sessions');

/** @function loadSession 
 * Loads the session (if it exists) and attaches 
 * it to req.session
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 */
function loadSession(req, res, next) {
  var match = /SID=([^;\S]+)/.exec(req.headers.cookie);
  if(!match) {
    // No cookie to load, so session should be empty
    req.session = {};
    return next();
  } else {
    var session = sessions.get(match[1]);
    req.session = session;
    next();
  }
}

module.exports = loadSession;