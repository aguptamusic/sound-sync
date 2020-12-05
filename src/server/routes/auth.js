module.exports = (app) => {
  app.get("/api/auth", async (req, res) => {
    const client_id = "2a236cf042cc4f93b2a884aa06a27120";
    const redirect_uri = "http://localhost:3000/callback"; //"sound-sync://callback";

    var scopes = "user-top-read";
    res.redirect(
      "https://accounts.spotify.com/authorize" +
        "?response_type=code" +
        "&client_id=" +
        client_id +
        (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
        "&redirect_uri=" +
        encodeURIComponent(redirect_uri)
    );
  });
};
