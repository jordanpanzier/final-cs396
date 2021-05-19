const Twit = require('twit');
const config = require('./config.js');
const T = new Twit(config);

const letterboxd = require('letterboxd');

const mongoose = require('mongoose');

console.log("Trying to connect to database...");
mongoose.connect(config.development.database, config.development.mongoConfig, err => {
    if (err) {
        console.log("Could not connect to database.");
        console.log(err);
    } else {
        console.log(`Connected to ${process.env.DB_NAME}.`);
    }
});

const connection = mongoose.connection;

letterboxd("jpanzier")
  .then((items) => 
  /*
    items.forEach(function(item){
      if (item.type == 'diary' && item.date.watched != 1609372800000){
        
      }
    }
    ))
    */
    console.log(items))
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