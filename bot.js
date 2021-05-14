const Twit = require('twit');
const config = require('./config.js');
const T = new Twit(config);

makeTweet();

function makeTweet() {
    var tweet = "This is a tweet.";
    T.post('statuses/update', { status: tweet }, tweeted);

    function tweeted(err, data, response) {
        if (err) {
          console.log(err);
        } else {
          console.log('Success: ' + data.text);
        }
      };
      
}