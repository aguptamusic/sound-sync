//called after auth, calls Spotify artists/shows endpoints and stores in db
const axios = require("axios");
const pref_url = "https://api.spotify.com/v1/me/top/{type}";
