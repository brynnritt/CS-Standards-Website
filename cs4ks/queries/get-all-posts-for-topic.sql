SELECT id AS post_id, subject, body, first || ' ' || last AS author, forum_topics.created_at AS date
FROM forum_posts 
INNER JOIN users ON forum_posts.user_id = users.id 
INNER JOIN forum_topics ON forum_posts.forum_topic_id = forum_topics.id
WHERE forum_topic_id = ?
ORDER BY forum_posts.created_at ASC;