var Twit = require("twit");
require("dotenv").config();
console.log(process.env.access_token);

var T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
//   timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
//   strictSSL: true, // optional - requires SSL certificates to be valid.
});

//
//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//
T.get("search/tweets", {
  q: "banana since:2011-07-11",
  count: 100
}, function (err, data, response) {
  console.log(data);
});

//
// Twit has promise support; you can use the callback API,
// promise API, or both at the same time.
//
T.get("account/verify_credentials", {
  skip_status: true
})
  .catch(function (err) {
    console.log("caught error", err.stack);
  })
  .then(function (result) {
    // `result` is an Object with keys "data" and "resp".
    // `data` and `resp` are the same objects as the ones passed
    // to the callback.
    // See https://github.com/ttezel/twit#tgetpath-params-callback
    // for details.

    console.log("data", result.data);
  });

//
//  destroy a tweet with id '343360866131001345'
//
T.post("statuses/destroy/:id", {
  id: "343360866131001345"
}, function (err, data, response) {
  console.log(data);
});

//
//  filter the twitter public stream by the word 'mango'.
//
var stream = T.stream("statuses/filter", {
  track: "mango"
});

stream.on("tweet", function (tweet) {
  console.log(tweet);
});

//
// filter the public stream by the latitude/longitude bounded box of San Francisco
//
var sanFrancisco = ["-122.75", "36.8", "-121.75", "37.8"];

var stream = T.stream("statuses/filter", {
  locations: sanFrancisco
});

stream.on("tweet", function (tweet) {
  console.log(tweet);
});

//
// filter the public stream by english tweets containing `#apple`
//
var stream = T.stream("statuses/filter", {
  track: "#apple",
  language: "en"
});

stream.on("tweet", function (tweet) {
  console.log(tweet);
});