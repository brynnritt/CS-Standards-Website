const templates = require('../templates');
const db = require('../database');

/** @function showPost 
 * Serves the specified post as a resonse.  The post id should be in req.params.id
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 */
function showPost(req, res) {
  // Get id of post from req object
  const post_id = parseInt(req.params.postID, 10);
  const topic_id = parseInt(req.params.topicID, 10);
  
  // retrieve post from db
  var post = db.prepare("SELECT * FROM forum_posts WHERE id = ?").get(post_id);
  
  var topic = db.prepare("SELECT * FROM forum_topics WHERE id = ?").get(topic_id);
  
  var post_body = post.body;
  var topic = topic.subject;
  
  // make date value into an Date object
  post.date = new Date(post.date);
  
  // render post as HTML with template
  var layout = templates["post.html"]({body: post_body, topic: topic});
  var html = templates["website-layout.html"]({layout: layout, user: req.session && req.session.user});
  
  // serve rendered HTML
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
  
}

module.exports = showPost;