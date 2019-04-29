# LIRI Bot

### UNC Coding Bootcamp Week 10 Homework Project


This week introduced the use of Node.js and gave us our first taste of backend web development.  

The LIRI Bot uses Node.js to perform querys from three different APIs and displays the results in the terminal

This project uses:

* JavaScript
* Node.js
* Moment
* Axios
* Node-Spotify-API
* DotEnv

#### Instructions

To use this app, there are four parameters that will need to be used.

- concert-this
- spotify-this-song
- movie-this
- do-what-it-says

Using the parameter + the search items will bring back the desired results.  If no search item is used with "spotify-this-song" then it will default to "The Sign" by "Ace of Base".  Also, if nothing is used with "movie-this", then it will default to "Mr. Nobody".  All search results and commands are written to the log.txt file.  Example screenshots are below.

* concert-this

I'm a Foo Fighters fan so this lists five upcoming concerts

![concert-this](/images/concert-this.gif)

* spotify-this-song

Here we are searching for "The Sound of Silence"

![spotify-this-song](/images/spotify-this-song.gif)

* spotify-this-song without a search item

![spotify-without-search](/images/spotify-this-song-the-sign.gif)

* movie-this

Here is some info on The Matrix

![movie-this](/images/movie-this.gif)

* movie-this without a search item

![movie-without-search](/images/movie-this-nobody.gif)

* do-what-it-says

We are using the random.txt file to input the commands

![random](/images/random.jpg)

![do-what-it-says](/images/do-what-it-says.gif)

* Results written to the [Log file](/log.txt)

