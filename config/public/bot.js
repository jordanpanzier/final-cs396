const baseURL = "https://letterboxd-jp.herokuapp.com/";
const fetch = require("node-fetch");

const config = require("./config/config")[env || "development"];

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