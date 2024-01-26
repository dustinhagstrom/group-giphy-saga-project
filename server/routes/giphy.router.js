const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", (req, res) => {
    // console.log("hit the trending route");

    const arrayOfUrls = [];
    axios
        .get(
            `http://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API_KEY}&limit=10`
        )
        .then((giphyRes) => {

            let giphyObjsData = giphyRes.data.data;
            giphyObjsData.forEach((giphyObj) => {
                let gifUrl = giphyObj.images.fixed_width.url;
                arrayOfUrls.push(gifUrl);
            });

            res.status(200).send(arrayOfUrls);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });

});

router.post("/", (req, res) => {
    const arrayOfUrls = [];

    axios
        .get(
            `http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&limit=10&lang=en&q=${req.body.query}&offset=0`
        )
        .then((giphyRes) => {
            let giphyObjsData = giphyRes.data.data;

            giphyObjsData.forEach((giphyObj) => {
                let gifUrl = giphyObj.images.fixed_width.url;
                arrayOfUrls.push(gifUrl);
            });

            res.status(200).send(arrayOfUrls);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

module.exports = router;
