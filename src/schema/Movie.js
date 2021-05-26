"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }, 
    ratingText: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required:true
    },
    dateWatched: {
        type: Number,
        required:true
    },
    dateReleased: {
        type: String,
        required:true
    }
});

MovieSchema.statics.create = function(obj) {
    const Movie = mongoose.model("Movie", MovieSchema);
    const movie = new Movie();
    movie.title = obj.title;
    movie.rating = obj.rating;
    movie.ratingText = obj.ratingText;
    movie.imageUrl = obj.imageUrl;
    movie.dateWatched = obj.dateWatched;
    movie.dateReleased = obj.dateReleased;
    return movie;
}

module.exports = mongoose.model("Movie", MovieSchema);
