-- DROP statements
DROP TABLE IF EXISTS "favorites";
DROP TABLE IF EXISTS "giphy";
DROP TABLE IF EXISTS "categories";


-- Database name should be: giphy_search_favorites
CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (100) NOT NULL
);

-- Giphy url table:  
CREATE TABLE "giphy" (
"id" SERIAL PRIMARY KEY,
"url" VARCHAR (1000) NOT NULL,
"category_id" INT REFERENCES "categories"("id"));

-- Favorites table:
CREATE TABLE "favorites" (
"id" SERIAL PRIMARY KEY,
"category_id" INT REFERENCES "categories"("id") DEFAULT NULL,
"giphy_id" INT REFERENCES "giphy"("id")
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

-- Test insert for Giphy url:
INSERT INTO "giphy" 
("url")
VALUES
('https://media4.giphy.com/media/zu81sENSUt5DFw7sGP/200w.gif?cid=44a4587ck291es7ueuwpazac6w2sqeqokug48258l6vq3wj8&ep=v1_gifs_trending&rid=200w.gif&ct=g');
  
-- Test insert for favorites:
INSERT INTO "favorites"
("category_id", "giphy_id")
VALUES
(2, 1);

-- Test Join favorites and giphy_url table to return urls of fav giphys
SELECT "favorites"."id", "giphy"."url"
FROM "favorites" JOIN "giphy" ON "favorites"."giphy_id" = "giphy"."id"
ORDER BY "favorites"."id" DESC LIMIT 10;

--Test update favorite category
--UPDATE "favorites" SET "category_id" = $1 WHERE "giphy_id" = $2;
UPDATE "favorites" SET "category_id" = 4 WHERE "giphy_id" = 1;


INSERT INTO "giphy" ("url") VALUES ($1) RETURNING "id";