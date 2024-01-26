const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

// return all favorite images
router.get("/", (req, res) => {
    // console.log("hit the favorite route");
    const queryText =
        'SELECT "favorites"."id", "giphy"."url" FROM "favorites" JOIN "giphy" ON "favorites"."giphy_id" = "giphy"."id" ORDER BY "favorites"."id" DESC LIMIT 10;';

    pool.query(queryText)
        .then((databaseRes) => {
            // console.log("db cat results:", databaseRes.rows);
            res.status(200).send(databaseRes.rows);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

// add a new favorite
router.post("/", (req, res) => {
    const id = req.body.id
    const queryText = 
    `INSERT INTO "favorites" ("giphy_id") VALUES ($1);`
    pool.query(queryText, [id])
        .then((databaseRes) => {
            res.sendStatus(201);
        })
    .catch((error) => {
        console.log(`Error on query ${error}`);
        res.sendStatus(500);
    })
});

// update a favorite's associated category
router.put("/:giphy_id/:category_id", (req, res) => {
    // req.body should contain a category_id to add to this favorite image

    console.log("req.params.giphy_id:", req.params.giphy_id);
    console.log("req.params.category_id:", req.params.category_id);
    const queryText = 'UPDATE "favorites" SET "category_id" = $1 WHERE "giphy_id" = $2;';
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
