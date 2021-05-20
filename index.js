"use strict";

const baseURL = "http://localhost:8081/";
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
        letterboxd("jpanzier")
            .then((items) => 
                
                items.forEach((item) => {
                    if (item.type != 'list' && item.date.watched != 1609372800000){
                        const movie = {
                            title:item.film.title,
                            rating:item.rating.score
                        }
                        fetch(`${baseURL}/movies/`)
                        .then(response => response.json())
                        .then(data => {
                            fetch(`${baseURL}/movies/`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(movie)
                            })
                            .then(response => {
                                if (!response.ok) {
                                    throw Error(response.statusText);
                                } else {
                                    return response.json();
                                }
                            })
                            .then(data => {
                                console.log('Success:', data);
                            })
                            .catch(err => {
                                console.error(err);
                                alert('Error!');
                            });
                        })
                    }
                }))
                
            .catch((error) => console.log(error));

    }
});

const routes = require("./src/routes");
app.use("", routes);

const PORT = process.env.PORT || 8081;
app.listen(PORT);
console.log("Application listening on PORT: " + PORT);
console.log("http://localhost:" + PORT);

module.exports = app;
