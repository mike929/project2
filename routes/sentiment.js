// var express = require("express");
// var sentiment = require("sentiment");
// // var Sentiment = require("sentiment");
// // app.use(express.static("routes"));
// var port = (process.env.VCAP_APP_PORT || 3000);
// var express = require("express");
// var app = express();
// app.get('/', function (req, res) {
//   res.send("Hello world.");
// });
// app.listen(port);
// console.log("Server listening on port " + port);

// // module.exports = function (app) {

// app.get("/sentiment", function (req, res) {
//   var response = "<HEAD>" +
//     "<title>Twitter Sentiment Analysis</title>\n" +
//     "</HEAD>\n" +
//     "<BODY>\n" +
//     "<P>\n" +
//     "Welcome to the Twitter Sentiment Analysis app. " +
//     "What phrase would you like to analzye?\n" +
//     "</P>\n" +
//     "<FORM action=\"/sentiment\" method=\"get\">\n" +
//     "<P>\n" +
//     "Enter a phrase to evaluate: <INPUT type=\"text\" name=\"phrase\"><BR>\n" +
//     "<INPUT type=\"submit\" value=\"Send\">\n" +
//     "</P>\n" +
//     "</FORM>\n" +
//     "</BODY>";
//   var phrase = req.query.phrase;
//   if (!phrase) {
//     res.send(response);
//     console.log(response);

//   } else {
//     sentiment(phrase, function (err, result) {
//       response = "sentiment(" + phrase + ") === " + result.score;
//       res.send(response);
//       console.log(response);

//     });
//   }
// });
