//use .env file
require('dotenv').config();


// require the express things
var express = require('express');
var router = express.Router();


// require the npm things
var twit = require('twit');
var sentimental = require('Sentimental');

// require the config things
var config = require("../config");

// middleware 
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});

// homepage get route
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twittiment!' });
});

// search post rout
router.post('/', function(req, res){
  
  // get the keyword from the page and set todays date
  var keyword = JSON.parse(req.body.keyword);
  var today = new Date();
  
  // initialize twit with dev creadentials
  var twitter = new twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret
  });
  
  // score variable
  var score = 0;

  // define the parameters for the call
  let params = {

      // search term
      q: keyword,

      // since date
      since: `${today.getFullYear()}-${today.getFullMonth()}-${today.getDate()}`,

      // # of tweets to get
      count: 20
  };
  
  // api call to twitter for the information  
  twitter.get('search/tweets', params, function(err, data) {

      // error check
      if ( err ) throw err; 

      // sentiment analysis
      score = performAnalysis(data['statuses']);
      
      // show score on the console
      console.log("score:", score)
    });
     
    // send the response back to the server
    setTimeout(function(){
      res.end(JSON.stringify({ 'score': score }))}, 5000);
});

// function to do the analysis
function performAnalysis(tweetSet) {
    
  var results = 0;
  // iterate through the tweets, pulling the text, retweet count, and favorite count
 
  for(var i in tweetSet) {
    tweet = tweetSet[i]['text'];
    retweets = tweetSet[i]['retweet_count'];
    favorites = tweetSet[i]['favorite_count'];
    
    // remove the hastag from the tweet text
    tweet = tweet.replace('#', '');
    
    // perform sentiment on the text
    var score = sentimental.analyze(tweet)['score'];
    
    // calculate score
    results += score;
    
    // if positive score
    if(score > 0){
      // add in retweets
      if(retweets > 0) {
        results += (Math.log(retweets)/Math.log(2));
      }
      // add in favorites
      if(favorites > 0) {
        results += (Math.log(favorites)/Math.log(2));
      }
    }

    // if negative score
    else if(score < 0){
      // add in retweets
      if(retweets > 0) {
        results -= (Math.log(retweets)/Math.log(2));
      }
      // add in favorites
      if(favorites > 0) {
        results -= (Math.log(favorites)/Math.log(2));
      }
    }
    else {
      results += 0;
    }
  }
  // return score
  results = results / tweetSet.length;
  return results;
}

module.exports = router;

