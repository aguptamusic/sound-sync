const mongoose = require("mongoose");
const axios = require("axios");

const User = mongoose.model("users");
const PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";

module.exports = (app) => {
  app.post("/api/profile", async (req, res) => {
    const accessToken = req.query.access_token || null;
    if (accessToken == null) res.status(401).send("Not authorized.");

    var profileRes;
    try {
      profileRes = await axios.get(PROFILE_ENDPOINT, {
        headers: { Authorization: "Bearer " + accessToken },
      });
    } catch (err) {
      console.error(err);
    }

    const userData = profileRes.data;
    const currUser = await User.findOne({ id: userData.id });
    if (currUser.size == 0) {
      const newUser = new User({
        id: userData.id,
        display_name: userData.display_name,
        spotify_url: userData.external_urls.spotify,
        href: userData.href,
        type: userData.type,
        uri: userData.uri,
        images: userData.images,
        top_artists: [],
        top_shows: [],
      });

      await newUser.save();
      res.status(201).send(newUser);
    }
    res.status(200).send(currUser);
  });
};
