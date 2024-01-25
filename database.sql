-- Database name should be: giphy_search_favorites
CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (100) NOT NULL
);

-- Giphy url table:  
CREATE TABLE "giphy_urls" (
"id" SERIAL PRIMARY KEY,
"url" VARCHAR (1000) NOT NULL
);

-- Favorites table:
CREATE TABLE "favorites" (
"id" SERIAL PRIMARY KEY,
"category_id" INT REFERENCES "categories"("id"),
"giphy_url" INT REFERENCES "giphy_urls"("id")
);
  
-- Default categories. You may change these. 🙂   
INSERT INTO "categories"
  ("name")
  VALUES
  ('wild'),
  ('uproarious'),
  ('poignant'),
  ('felicitous'),
  ('whimsical');
  
-- Test insert for favorites:
INSERT INTO "favorites"
("category_id")
VALUES
(2);

-- Test insert for Giphy url:
INSERT INTO "giphy_urls" 
("url")
VALUES
('https://media4.giphy.com/media/zu81sENSUt5DFw7sGP/200w.gif?cid=44a4587ck291es7ueuwpazac6w2sqeqokug48258l6vq3wj8&ep=v1_gifs_trending&rid=200w.gif&ct=g');


-- You'll need a "favorites" table for storing each instance of
-- a Giphy image that has been "favorited."
-- Each favorite image can be assigned one of the existing
-- categories via foreign key. This is a one-to-many relationship:
--    One favorite has one category.
--    One category can be had by many favorites.
