"use strict";

const Movie = require("./schema/Movie");

const express = require("express");
const { response } = require("express");
const router = express.Router();

router.route("/")
    .get((_req, res) => {
        console.log("GET /");
        res.status(200).send({
            data: "App is running."
        });
    });
    
// ---------------------------------------------------
// Edit below this line
// ---------------------------------------------------
router.route("/movies")
    .get((req, res) => {
        console.log("GET /movies");

        // already implemented:
        Movie.find({})
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
    .post((req, res) => {
        console.log("POST /movies");

        const newMovie = req.body;
        if (!newMovie.title || !newMovie.rating){
            res.status(400).sendStatus({
                message: "Input doesn't have a title or rating."
            });
            return;
        }
        Movie.create(newMovie)
        .save()
        .then(movies => {
            res.status(201).send(movies);
        })

    });

module.exports = router;