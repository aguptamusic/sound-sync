//called after auth, calls Spotify artists/shows endpoints and stores in db
const axios = require("axios");
const artist_url = "https://api.spotify.com/v1/me/top/artists";
const shows_url = "https://api.spotify.com/v1/me/shows";

module.exports = (app) => {
  app.post("/api/preferences", async (req, res) => {
    const accessToken = req.query.access_token || null;
    if(accessToken == null) res.status(401).send("Not authorized.");

    var artistRes;
    var showsRes;
    try {
      artistRes = await axios.get(artist_url, {
        headers: { Authorization: "Bearer " + accessToken },
      });
      showsRes = await axios.get(shows_url, {
        headers: { Authorization: "Bearer " + accessToken },
      });
    } catch (error) {
      console.error(error);
    }

    console.log(artistRes.data);
    console.log(showsRes.data);
    res.send(artistRes.data);
  });
};
