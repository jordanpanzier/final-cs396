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
        if (!newMovie.title || !newMovie.rating ||
            !newMovie.imageURL || !newMovie.dateWatched || !newMovie.dateReleased){
            res.status(400).sendStatus({
                message: "Input doesn't have necessesary requirements."
            });
            return;
        }
        Movie.create(newMovie)
        .save()
        .then(movies => {
            res.status(201).send(movies);
        })

    });

router.route("/movies/:id")
    .delete((req, res) => {
        console.log(`DELETE /movies/${req.params.id}`);
        Movie.findOneAndDelete(
            {_id: req.params.id}
        )
        .then(movie => {
            if (movie) {
                res.status(200).send(null)
            }
            else {
                res.status(404).send({
                    message: "ID not found."
                    });
            }
        })
        .catch(err => {
            res.status(404).send({
                message: "Error.",
                err: err
                });
            });
    })

module.exports = router;