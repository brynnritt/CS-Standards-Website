const templates = require('../templates');
const db = require('../database');

/** @function showTopic 
 * Serves the specified topic as a response.  The topic id should be in req.params.id
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 */
function showTopic(req, res) {
  const topic_id = parseInt(req.params.topicID, 10);
  
  var topic = db.prepare("SELECT * FROM forum_topics WHERE id = ?").get(topic_id);
  
  // Get all posts from topic 
  var posts = db.prepare(`SELECT forum_posts.id AS post_id, subject, body, first || ' ' || last AS author, forum_topics.created_at AS date
    FROM forum_posts 
    INNER JOIN users ON forum_posts.user_id = users.id 
    INNER JOIN forum_topics ON forum_posts.forum_topic_id = forum_topics.id
    WHERE forum_topic_id = ?
    ORDER BY forum_posts.created_at ASC`).all(topic_id);
  
  
  var listHtml = templates['post-list.html']({posts: posts, topic_id: topic_id});
  
  var subject = "Topic: " + topic.subject;
  var title = topic.subject;
  
  var layout = templates['list-layout.html']({subject: subject, list: listHtml, title: title, link: "/forum/topics/" + topic_id + "/posts/new", button_text: "Create New Post"});
  var html = templates['website-layout.html']({layout: layout, user: req.session.user});
    
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
  

}

module.exports = showTopic;