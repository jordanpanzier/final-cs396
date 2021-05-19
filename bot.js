const Twit = require('twit');
const config = require('./config.js');
const T = new Twit(config);

const letterboxd = require('letterboxd');


letterboxd("jpanzier")
  .then((items) => 
    items.forEach(function(item){
      if (item.type == 'diary' && item.date.watched != 1609372800000){
        const movie = {
          "film":item.film,
          "watched-date":item.rating
        }
        
      }
    }
    ))
  .catch((error) => console.log(error));

function makeTweet() {
    var d = new Date()
    T.post('statuses/update', { status: d }, tweeted);

    function tweeted(err, data, response) {
        if (err) {
          console.log(err);
        } else {
          console.log('Success: ' + data.text);
        }
      };
}

makeTweet();