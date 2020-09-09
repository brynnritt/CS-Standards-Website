const db = require('../database');

/** @function createTopic()
 * Creates a new topic using the supplied form data.
 * Form data should be attached to req.body
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the reponse object
 */
function createTopic(req, res) {
  var subject = req.body.subject;
  var user_id = 1;
  
  info = db.prepare("INSERT INTO forum_topics (subject, user_id) VALUES (?, ?)").run(subject, user_id);
  
  console.log(info.changes);
  if(info.changes != 1) return serveError(req, res, 500, `Unable to insert ${subject}, ${user_id} into posts`);
  
  res.writeHead(302, {"Location": `/forum/topics/${info.lastInsertRowid}`});
  res.end(); 
}
module.exports = createTopic;