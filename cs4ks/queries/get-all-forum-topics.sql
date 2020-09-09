SELECT subject, 
  first || ' ' || last AS creator, forum_topic_id AS topic_id,
  (SELECT COUNT(id) FROM forum_posts WHERE forum_posts.forum_topic_id = forum_topics.id) as postCount,
  forum_topics.created_at AS date
FROM forum_topics 
INNER JOIN users ON forum_topics.user_id = users.id
ORDER BY forum_topics.created_at DESC;