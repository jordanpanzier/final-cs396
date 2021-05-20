"use strict";

const baseURL = "https://letterboxd-jp.herokuapp.com/";
const fetch = require("node-fetch");

require("dotenv").config();
const env = "" + process.env.NODE_ENV;

const express = require("express");
const app = express();

const bodyConfig = {
    limit: "10mb",
    extended: true
};
app.use(express.urlencoded(bodyConfig));
app.use(express.json(bodyConfig));

const middleware = require("./config/middleware");
app.use(middleware.cors);

const config = require("./config/config")[env || "development"];
const mongoose = require("mongoose");

const Twit = require('twit');
const T = new Twit(config);
const letterboxd = require('letterboxd');

function makeTweet(movie, rating) {
    var tweet = "I just watched " + movie + " and rated it " + rating + "/5 stars."
    T.post('statuses/update', { status: tweet}, tweeted);

    function tweeted(err, data, response) {
        if (err) {
          console.log(err);
        } else {
          console.log('Success: ' + data.text);
        }
      };
}

console.log("Trying to connect to database...");
mongoose.connect(config.database, config.mongoConfig, err => {
    if (err) {
        console.log("Could not connect to database.");
        console.log(err);
    } else {
        console.log(`Connected to ${process.env.DB_NAME}.`);
    }
});

const routes = require("./src/routes");
app.use("", routes);

const PORT = process.env.PORT || 8081;
app.listen(PORT);
console.log("Application listening on PORT: " + PORT);
console.log("http://localhost:" + PORT);

module.exports = app;
