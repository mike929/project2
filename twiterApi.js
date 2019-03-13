// Requiring my twitter and config
var Twitter = require('twitter');
// var config = require("./config");

// Requiring my dotenv
const dotenv = require('dotenv');
dotenv.config();
// console.log(`Your port is ${process.env.PORT}`); // 8626

// Stablishing a twitter connection 
// var client = new Twitter(config);
console.log(process.env.TWITTER_CONSUMER_KEY)
// Stablishing a twitter connection 
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// //Custom Word Submit Wrapper Function
// function customWordSearch(value) {
//     collectedResults = {
//         error: 0
//     };
//     // collectedResults.word = $("#post").val().trim()
//     // collectedResults.word = "Donald Trump"
//     // getImageFromWord()
//     streamingTwitterFromWord(value)
// };

// This function will search the twits based in the user input
function getTwitterFromWord (word) {
var params = {
    q: word,
    count: 10
}
// This is a get request to that search for tweets based in the parameter define in our variable params
client.get('search/tweets', params, gotData);

function gotData(err, data, response) {
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text + "\n");        
    }
};
};

// This function will search the twits based in the user input and provide you the real time streaming
function streamingTwitterFromWord (word) {    

// This is a get request to get the real time streaming

client.stream('statuses/filter', {track: word}, function(stream) {
      stream.on('data', function(event) {
        console.log(event && event.text + "\n");
      });
    
      stream.on('error', function(error) {
        throw error;
      });
    });
};

// streamingTwitterFromWord();
// customWordSearch();

module.exports = streamingTwitterFromWord;