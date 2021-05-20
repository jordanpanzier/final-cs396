const baseURL = "https://letterboxd-jp.herokuapp.com/";
const fetch = require("node-fetch");

require("dotenv").config();
const env = "" + process.env.NODE_ENV;

const config = require("./config/config")[env || "development"];
console.log(config)

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
                    .then(dataMovies => {
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
                        .then(dataMovie => {
                            console.log('Success:', dataMovie);
                        })
                        .catch(err => {
                            console.error(err);
                            alert('Error!');
                        });
                    })
                }
            }))
            
        .catch((error) => console.log(error));