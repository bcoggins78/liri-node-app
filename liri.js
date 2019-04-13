require("dotenv").config();
var axios = require("axios");
var spotifyApi = require("node-spotify-api")
var moment = require("moment");
var dotEnv = require("dotenv")

var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);


var searchParam = process.argv[2];



if (searchParam == 'concert-this') {
    var artist = process.argv[3];
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(response){
        
        for (var i = 0; i < 5; i++) {
        console.log("Name of the Venue: " + response.data[i].venue.name);
        console.log("Venu Location: "+ response.data[i].venue.city + ", " + response.data[i].venue.region);
        var dateFormat = "YYYY/MM/DD";
        var dateTime = response.data[i].datetime
        var date = dateTime.split("T")[0];
        var convertedDate = moment(date, dateFormat);
        console.log("Date: " + convertedDate.format("MM/DD/YYYY"));
        console.log("==========================");
        }
    })
}

else if (searchParam == 'spotify-this-song') {
    var song = process.argv[3];
}

else if (searchParam == 'movie-this') {
    var movie = process.argv[3];
}

else if (searchParam == 'do-what-it-says') {

}