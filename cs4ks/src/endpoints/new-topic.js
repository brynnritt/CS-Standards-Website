const templates = require('../templates');

/** @function newPost 
 * Serves the form for creating a new topic 
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function newTopic(req, res) {
  var topicHtml = templates["new-topic.html"]();
  var html = templates["website-layout.html"]({layout: topicHtml, user: req.session.user});
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", "text/html");
  res.end(html);
}

module.exports = newTopic;