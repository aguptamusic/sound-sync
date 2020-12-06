const axios = require("axios");
const config = require("../../config/config");
const request = require("request");
const profile = require("./profile");

module.exports = (app) => {
  app.get("/api/auth", async (req, res) => {
    var scopes = "user-top-read user-library-read";
    res.redirect(
      "https://accounts.spotify.com/authorize" +
        "?response_type=code" +
        "&client_id=" +
        config.spotifyClientId +
        (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
        "&redirect_uri=" +
        encodeURIComponent(config.redirectUri) +
        "&show_dialog=true"
    );
  });

  app.get("/callback", async (req, res) => {
    const code = req.query.code || null;
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: config.redirectUri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            config.spotifyClientId + ":" + config.spotifyClientSecret
          ).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, async (error, response, body) => {
      const accessToken = body.access_token;
      const queryParam = "?access_token=" + accessToken;
      const profileRes = await axios.post(
        "http://localhost:4000/api/profile" + queryParam
      );
      const idParam = "&id=" + profileRes.data.id;
      const prefRes = await axios.post(
        "http://localhost:4000/api/preferences" + queryParam + idParam
      );

      res.redirect("/match");
    });
  });
};
