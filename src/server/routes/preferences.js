//called after auth, calls Spotify artists/shows endpoints and stores in db
const axios = require("axios");
const artist_url = "https://api.spotify.com/v1/me/top/artists";
const track_url = "https://api.spotify.com/v1/me/top/tracks";

module.exports = (app) => {
  app.get("/api/preferences", async (req, res) => {
    let token = req.query.access_token || null;
    var artist_res;
    var track_res;
    try {
      //GET top artists
      artist_res = await axios.get(artist_url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      //GET top tracks
      track_res = await axios.get(track_url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
};
