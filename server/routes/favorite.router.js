const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

// return all favorite images
router.get("/", (req, res) => {
    const queryText =
        'SELECT "favorites"."id", "giphy"."url" FROM "favorites" JOIN "giphy" ON "favorites"."giphy_id" = "giphy"."id" ORDER BY "favorites"."id" DESC LIMIT 10;';

    pool.query(queryText)
        .then((databaseRes) => {
            res.status(200).send(databaseRes.rows);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

// add a new favorite
router.post("/", (req, res) => {
    const url = req.body.url;

    const queryText = `WITH "inserted_giphy" AS (INSERT INTO "giphy" ("url") VALUES ($1) RETURNING "id") INSERT INTO "favorites" ("giphy_id") SELECT "id" FROM "inserted_giphy";`;
    pool.query(queryText, [url])
        .then((databaseRes) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

// update a favorite's associated category
router.put("/:giphy_id/:category_id", (req, res) => {
    const queryText =
        'UPDATE "favorites" SET "category_id" = $1 WHERE "giphy_id" = $2;';
    const queryParams = [req.params.category_id, req.params.giphy_id];

    pool.query(queryText, queryParams)
        .then((databaseRes) => {
            console.log("databaseRes update category on fav:", databaseRes);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

// delete a favorite
router.delete("/:id", (req, res) => {
    res.sendStatus(200);
});

module.exports = router;
