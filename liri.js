require("dotenv").config();
var axios = require("axios");
var spotifyApi = require("node-spotify-api")
var moment = require("moment");
var dotEnv = require("dotenv")

var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);


var searchParam = process.argv[2];
var artist
var movie


if (searchParam == 'concert-this') {
    artist = process.argv.slice(3).join("+");
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(response){
        
        for (var i = 0; i < 5; i++) {
        console.log("Name of the Venue: " + response.data[i].venue.name);
        console.log("Venue Location: "+ response.data[i].venue.city + ", " + response.data[i].venue.region);
        var dateFormat = "YYYY/MM/DD";
        var dateTime = response.data[i].datetime
        var date = dateTime.split("T")[0];
        var convertedDate = moment(date, dateFormat);
        console.log("Date: " + convertedDate.format("MM/DD/YYYY"));
        console.log("==========================");
        }
    },

    function(error){
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
    })
}

else if (searchParam == 'spotify-this-song') {
    var song = process.argv[3];
}

else if (searchParam == 'movie-this') {
    movie = process.argv.slice(3).join("+");
    if (movie == "") {
        movie = "Mr. Nobody";
    }
    
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy"
       
    axios.get(queryUrl).then(
        function(response) {
          console.log("===================================")
          console.log("Title: " + response.data.Title);
          console.log("Year of Release: " + response.data.Year);
          console.log("IMDB Rating: " + response.data.Ratings[0].Value);
          console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
          console.log("Country: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
          console.log("===================================")
        },

        function(error) {
            if (error.response) {  
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          }
    );
}

else if (searchParam == 'do-what-it-says') {

}