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
    imageURL: {
        type: String,
        required:true
    },
    dateWatched: {
        type: Number,
        required:true
    },
    DataTransferItem: {
        type: String,
        required:true
    }
});

MovieSchema.statics.create = function(obj) {
    const Movie = mongoose.model("Movie", MovieSchema);
    const movie = new Movie();
    movie.title = obj.title;
    movie.rating = obj.rating;
    return movie;
}

module.exports = mongoose.model("Movie", MovieSchema);
