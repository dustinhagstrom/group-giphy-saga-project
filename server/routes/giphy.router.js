const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", (req, res) => {
    // console.log("hit the trending route");
    // console.log("api Key:", process.env.GIPHY_API_KEY);

    const arrayOfUrls = [];
    axios
        .get(
            `http://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API_KEY}&limit=10`
        )
        .then((giphyRes) => {

            let giphyObjsData = giphyRes.data.data;
            // console.log("giphyObjsData:", giphyObjsData);

            giphyObjsData.forEach((giphyObj) => {
                // we want to store in redux state
                let gifUrl = giphyObj.images.fixed_width.url;
                // push this url to the array of urls in store
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
    console.log("hit the search route, req.body:", req.body);

    const arrayOfUrls = [];

    axios
        .get(
            `http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&limit=10&lang=en&q=${req.body.query}&offset=0`
        )
        .then((giphyRes) => {
            let giphyObjsData = giphyRes.data.data;
            // console.log("giphyObjsData:", giphyObjsData);

            giphyObjsData.forEach((giphyObj) => {
                // we want to store in redux state
                let gifUrl = giphyObj.images.fixed_width.url;
                // push this url to the array of urls in store
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
