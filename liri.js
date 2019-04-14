require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var spotifyApi = require("node-spotify-api")
// var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var dotEnv = require("dotenv")
var keys = require("./keys.js");

var searchParam = process.argv[2];
var artist = process.argv.slice(3).join("+");
var movie = process.argv.slice(3).join("+");
var song = process.argv.slice(3).join("+");

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        searchParam = data.split(",")[0];
        artist = data.split(',')[1];
        song = data.split(',')[1];
        movie = data.split(',')[1];

        search();

    });
}

function concertThis() {
    if (searchParam == 'concert-this') {
        // artist = process.argv.slice(3).join("+");
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {

            for (var i = 0; i < 5; i++) {
                console.log("Name of the Venue: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
                var dateFormat = "YYYY/MM/DD";
                var dateTime = response.data[i].datetime
                var date = dateTime.split("T")[0];
                var convertedDate = moment(date, dateFormat);
                console.log("Date: " + convertedDate.format("MM/DD/YYYY"));
                console.log("==========================");
            }
        },

            function (error) {
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
}

function movieThis() {

    // movie = process.argv.slice(3).join("+");
    if (movie == "") {
        movie = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy"

    axios.get(queryUrl).then(
        function (response) {
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

        function (error) {
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

function search() {
    if (searchParam == 'concert-this') {
        concertThis()
    }

    else if (searchParam == 'spotify-this-song') {
        song = process.argv[3];
    }

    else if (searchParam == 'movie-this') {
        movieThis()
    }

    else if (searchParam == 'do-what-it-says') {
        doWhatItSays()
    }
}

search();