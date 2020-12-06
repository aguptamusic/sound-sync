const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
const config = require("../config/config");
const path = require('path');

mongoose.connect(config.mongoURI, { useNewUrlParser: true });
require("./models/user");

const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.cookieKey]
  })
);

require("./routes/auth")(app);
require("./routes/profile")(app);
require("./routes/preferences")(app);
require("./routes/match")(app);

app.use(express.static('../../build'));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../build/index.html'));
});

app.listen(4000, () => {
  console.log("Listening on port 4000.");
});
