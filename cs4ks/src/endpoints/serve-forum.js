const db = require('../database');
const templates = require('../templates');

/** @function serveForum
 * Serves the forum
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function serveForum(req, res) {
  //var topics = db.prepare("SELECT * FROM forum_topics ORDER BY created_at DESC").all();
  var topic = db.prepare(`SELECT subject, forum_topics.id AS topic_id,
    first || ' ' || last AS creator, 
    (SELECT COUNT(id) FROM forum_posts WHERE forum_posts.forum_topic_id = forum_topics.id) as postCount,
    forum_topics.created_at AS date
  FROM forum_topics 
  INNER JOIN users ON forum_topics.user_id = users.id
  ORDER BY forum_topics.created_at DESC`).all();
  
  var listHtml = templates['topic-list.html']({topics: topic});
  var topicButton = templates['new-topic-button.html'];
  
  var subject = "";
  var title = topic.subject;
  
  var layout = templates['list-layout.html']({subject: subject, list: listHtml, title: title, link: "/forum/topics/new", button_text: "Create New Topic"});
  var html = templates['website-layout.html']({layout: layout, user: req.session && req.session.user});
    
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = serveForum;