let express = require("express");
let request = require("request");
let querystring = require("querystring");
const { access } = require("fs");

module.exports = (app) => {
  //after user grants permission, redirects to /callback
  const redirect_uri = "http://localhost:3000/callback"; //"sound-sync://callback";
  const client_id = "2a236cf042cc4f93b2a884aa06a27120";
  const secret_id = "72964233f5f344ac814de3b68ee154dd";

  app.get("/api/auth", async (req, res) => {
    var scopes = "user-top-read";
    res.redirect(
      "https://accounts.spotify.com/authorize" +
        "?response_type=code" +
        "&client_id=" +
        client_id +
        (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
        "&redirect_uri=" +
        encodeURIComponent(redirect_uri) +
        "&show_dialog=true"
    );
  });

  //use code generated from request to /authorize endpoint
  app.get("/callback", function (req, res) {
    let code = req.query.code || null;
    let authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + secret_id).toString("base64"),
      },
      json: true,
    };

    //get the access_token
    request.post(authOptions, function (error, response, body) {
      var access_token = body.access_token;
      //window.localStorage.setItem("access_token", access_token);
      let uri = "http://localhost:3000/api/profile";
      res.redirect(uri + "?access_token=" + access_token);
    });
  });
};
