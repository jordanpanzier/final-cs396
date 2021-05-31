const baseURL = "https://letterboxd-jp.herokuapp.com";
const fetch = require("node-fetch");

require("dotenv").config();
const env = "" + process.env.NODE_ENV;

const config = require("./config/config");

const Twit = require('twit');
const T = new Twit(config.development);
const letterboxd = require('letterboxd');
const { data } = require("cheerio/lib/api/attributes");

// Use Twit node package and Twitter API to post a tweet @letterboxd_jp
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

// Get all the movies in the database. 
fetch(`${baseURL}/movies/`)
.then(response => response.json())
.then(dataMovies => {
    let movieTitleList = [];
    dataMovies.forEach((dataMovie) => {
        movieTitleList.push(dataMovie.title)
    })

    // Get the twenty most recent diary entries for my Letterboxd account, jpanzier.
    letterboxd("jpanzier")
    .then((letterMovies) => {
        console.log(letterMovies)
        letterMovies.forEach((letterMovie) => {
            // Check that it's a movie and that I watched it past 1/1/21.
            // I retroactively logged all my movies before 2021, but this 
            // will only track after that date. 
            if (letterMovie.type != 'list' && letterMovie.date.watched != 1609372800000
                && !movieTitleList.includes(letterMovie.film.title)){
                    
                    const movie = {
                        title:letterMovie.film.title,
                        rating:letterMovie.rating.score,
                        ratingText:letterMovie.rating.text,
                        imageUrl:letterMovie.film.image.medium,
                        dateWatched: letterMovie.date.watched,
                        dateReleased: letterMovie.film.year
                    }
                    
                    // Add movie to database. 
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
                        makeTweet(movie.title, movie.rating)
                        console.log('Success:', dataMovie);
                    })
                    
                    .catch(err => {
                        console.error(err);
           
                    });
                    
            }
            else{
                console.log("Database doesn't need to be updated.")
            }
        
        })
    })
    .catch((error) => console.log(error));
})

.catch(err => {
    console.error(err);

})
