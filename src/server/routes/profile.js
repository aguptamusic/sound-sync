const axios = require("axios");
const profile_url = "https://api.spotify.com/v1/me";
module.exports = (app) => {
  app.get("/api/profile", async (req, res) => {
    let token = req.query.access_token || null;
    var profile_res;
    try {
      profile_res = await axios.get(profile_url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(profile_res.data);
    } catch (error) {
      console.error(error);
    }
    res.send(profile_res.data);
  });
};
