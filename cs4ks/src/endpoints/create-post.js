const db = require('../database');

/** @function createPost()
 * Creates a new post using the supplied form data.
 * Form data should be attached to req.body
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the reponse object
 */
function createPost(req, res) {
  const topic_id = parseInt(req.params.topicID, 10);
  
  var body = req.body.body;
  var user_id = 1;
  
  //deposit info into database
  info = db.prepare("INSERT INTO forum_posts (body, forum_topic_id, user_id) VALUES (?,?,?)").run(body, topic_id, user_id);
  
  //check if database was sucessfuly updated
  if(info.changes != 1) return serveError(req, res, 500, `Unable to insert ${title}, ${content}, ${date} into posts`);
  
  //show user new post
  res.writeHead(302, {"Location": `/forum/topics/${topic_id}/posts/${info.lastInsertRowid}`})
  res.end(); 
}

module.exports = createPost;