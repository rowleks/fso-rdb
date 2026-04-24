-- Seed notes table
INSERT INTO notes (content, important)
VALUES ('Relational databases rule the world', true),
  ('MongoDB is webscale', false);
--Seed blogs table
INSERT INTO blogs (author, url, title, likes)
VALUES (
    'Dan Abramov',
    'https://overreacted.io/on-let-vs-const/',
    'On let vs const',
    0
  ),
  (
    'Rowland Momoh',
    'https://medium.com/javascript-in-plain-english/understanding-promises-in-javascript-d853f4190e97',
    'Understanding Promises in JavaScript',
    11
  ),
  (
    'Laurenz Albe',
    'https://www.cybertec-postgresql.com/blog/postgresql-monitoring-for-beginners/',
    'PostgreSQL Monitoring for Beginners',
    5
  );
-- Query tables
SELECT *
FROM blogs;
SELECT *
FROM notes;
SELECT *
FROM users;