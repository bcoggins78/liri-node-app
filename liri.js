// Required packages
require("dotenv").config();
var Spotify = require("node-spotify-api")
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");

// Search Variables
var searchParam = process.argv[2];
var searchItem = process.argv.slice(3).join(" ");

// Writes the command to the log.txt file
fs.appendFile("log.txt", "\n\n--------Command Used---------\n" + searchParam + " " + searchItem,
    function (err) {
        if (err) {
            return console.log(err);
        }
    });

// Function that runs do-what-it-says
function doWhatItSays() {

    // Reads the random.txt file for the commands to use
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        // Splits the text in an array, assigns the first item to the searchParam variable, and the second to the searchItem
        searchParam = data.split(",")[0];
        searchItem = data.split(',')[1];

        // Runs the search function
        search();

    });
}

// Function that runs concert-this
function concertThis() {

    // Sets the artist variable to the searchItem
    var artist = searchItem;

    // Bands in Town api used to search for the artist
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {

        // For loop that gives the first 5 search results
        for (var i = 0; i < 5; i++) {

            // Assigning variables for each catagory
            var venue = response.data[i].venue.name;
            var venueCity = response.data[i].venue.city;
            var venueRegion = response.data[i].venue.region;
            var dateFormat = "YYYY/MM/DD";
            var dateTime = response.data[i].datetime
            var date = dateTime.split("T")[0];  // Date was also giving the time, split value at "T" into array and used the first value which was the date
            var convertedDate = moment(date, dateFormat);
            var concertDate = convertedDate.format("MM/DD/YYYY");

            // Adds the results to the log.txt file
            fs.appendFile("log.txt",
                "\n===========================================" +
                "\nName of the Venue: " + venue +
                "\nVenue Location: " + venueCity + ", " + venueRegion +
                "\nDate: " + concertDate,

                function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });

            // Displaying results in the console
            console.log("===========================================");
            console.log("Name of the Venue: " + venue);
            console.log("Venue Location: " + venueCity + ", " + venueRegion);
            console.log("Date: " + concertDate);

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

// Function that runs spotify-this-song
function spotifyThis() {

    // Sets the song variable to the searchItem
    var song = searchItem;

    // If the song variable has no value, then "The Sign" is used by "Ace of Base".  
    // Type also changed to album, track, otherwise different results would have come back with just "The Sign"
    // Limit changed to 1 since we're only looking for 1 song
    if (song == "") {
        song = "Ace of Base The Sign";
        type = "album,track";
        limit = 1;
    }
    // If the song variable has a value, the type is set to use only "track" and the serach limit set to 5
    else {
        type = "track";
        limit = 5;
    }

    spotify
        .search({ type: type, query: song, limit: limit })
        .then(function (response) {
            resultArray = response.tracks.items;
            
            // For loop used to display the 5 search results
            for (var i = 0; i < resultArray.length; i++) {
                
                // Returned items set to variables
                var artist = response.tracks.items[i].album.artists[0].name;
                var trackName = response.tracks.items[i].name;
                var previewUrl = response.tracks.items[i].external_urls.spotify;
                var album = response.tracks.items[i].album.name;
                
                // Results written to the log.txt file
                fs.appendFile("log.txt",
                    "\n===========================================" +
                    "\nArtist: " + artist +
                    "\nTrack Name: " + trackName +
                    "\nPreview URL: " + previewUrl +
                    "\nAlbum: " + album,
                    function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    });
                
                // Results displayed in the console
                console.log("===========================================");
                console.log("Artist: " + artist);
                console.log("Track Name: " + trackName);
                console.log("Preview URL: " + previewUrl);
                console.log("Album: " + album);

            }

        })
        .catch(function (err) {
            console.log(err);
        });
}

// Function used to run movie-this
function movieThis() {

    // Sets the movie variable to the searchItem
    var movie = searchItem;

    // If movie has no value, then it will be given the string "Mr. Nobody"
    if (movie == "") {
        movie = "Mr. Nobody";
    }

    // Sets the query URL for the OMDB API
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy"

    // API used to search the movie
    axios.get(queryUrl).then(
        function (response) {
            
            // Each result given a variable
            movieTitle = response.data.Title;
            releaseYear = response.data.Year;
            imdbRating = response.data.Ratings[0].Value;
            rTomatoe = response.data.Ratings[1].Value;
            country = response.data.Country;
            language = response.data.Language;
            plot = response.data.Plot;
            actors = response.data.Actors;

            // Results written to the log.txt file
            fs.appendFile("log.txt",
                "\n===========================================" +
                "\nTitle: " + movieTitle +
                "\nYear of Release: " + releaseYear +
                "\nIMDB Rating: " + imdbRating +
                "\nRotten Tomatoes Rating: " + rTomatoe +
                "\nCountry: " + country +
                "\nLanguage: " + language +
                "\nPlot: " + plot +
                "\nActors: " + actors,
                function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            
            // Results displayed in the console
            console.log("===================================")
            console.log("Title: " + movieTitle);
            console.log("Year of Release: " + releaseYear);
            console.log("IMDB Rating: " + imdbRating);
            console.log("Rotten Tomatoes Rating: " + rTomatoe);
            console.log("Country: " + country);
            console.log("Language: " + language);
            console.log("Plot: " + plot);
            console.log("Actors: " + actors);

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

// Function that takes to value of the searchParam, and determines which function to run
function search() {
    if (searchParam == 'concert-this') {
        concertThis();
    }

    else if (searchParam == 'spotify-this-song') {
        spotifyThis();
    }

    else if (searchParam == 'movie-this') {
        movieThis();
    }

    else if (searchParam == 'do-what-it-says') {
        doWhatItSays();
    }
}

search();