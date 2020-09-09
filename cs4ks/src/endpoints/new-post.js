const templates = require('../templates');
const db = require('../database');

/** @function newPost 
 * Serves the form for creating a new post 
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function newPost(req, res) {
  const topic_id = parseInt(req.params.topicID, 10);
  var topic = db.prepare("SELECT * FROM forum_topics WHERE id = ?").get(topic_id);
  
  var postHtml = templates["new-post.html"]({topic_id: topic_id, subject: topic.subject});
  var html = templates["website-layout.html"]({layout: postHtml, user: req.session.user});
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", "text/html");
  res.end(html);
}

module.exports = newPost;