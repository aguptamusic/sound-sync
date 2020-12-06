//called after auth, calls Spotify artists/shows endpoints and stores in db
const mongoose = require("mongoose");
//const ArtistSchema = require("../models/artist");
//const ShowSchema = require("../models/show");
const axios = require("axios");
const artist_url = "https://api.spotify.com/v1/me/top/artists";
const shows_url = "https://api.spotify.com/v1/me/shows";

const User = mongoose.model("users");

module.exports = (app) => {
  app.post("/api/preferences", async (req, res) => {
    //get preferences
    const accessToken = req.query.access_token || null;
    if (accessToken == null) res.status(401).send("Not authorized.");
    var artistRes;
    var showRes;
    try {
      artistRes = await axios.get(artist_url, {
        headers: { Authorization: "Bearer " + accessToken },
      });
      showRes = await axios.get(shows_url, {
        headers: { Authorization: "Bearer " + accessToken },
      });
    } catch (error) {
      console.error(error);
    }
    let artistData = artistRes.data.items;
    let showData = showRes.data.items;

    //add to database entry for current user
    const userId = req.query.id;
    const currUser = await User.findOne({ id: userId });
    artistArray = [];
    showArray = [];
    artistData.forEach((artist) => {
      const newArtist = {
        id: artist.id,
        name: artist.name,
        spotify_url: artist.external_urls["spotify"],
        type: artist.type,
        popularity: artist.popularity,
        uri: artist.uri,
        genres: artist.genres,
        images: artist.images,
      };
      artistArray.push(newArtist);
    });
    showData.forEach((podcast) => {
      const newShow = {
        id: podcast.show.id,
        name: podcast.show.name,
        description: podcast.show.description,
        spotify_url: podcast.show.external_urls["spotify"],
        href: podcast.show.href,
        media_type: podcast.show.media_type,
        type: podcast.show.type,
        uri: podcast.show.uri,
        images: podcast.show.images,
      };
      showArray.push(newShow);
    });
    currUser.set({
      top_artists: artistArray,
      top_shows: showArray,
    });
    await currUser.save();
  });
};
