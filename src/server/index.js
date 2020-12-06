const express = require("express");
const mongoose = require("mongoose");
const config = require("../config/config");

mongoose.connect(config.mongoURI, { useNewUrlParser: true });
require("./models/user");

const app = express();
require("./routes/auth")(app);
// require("./routes/match")(app);
require("./routes/profile")(app);
require("./routes/preferences")(app);

app.get("*", (req, res) => {
  res.send("Home Page");
});

app.listen(4000, () => {
  console.log("Listening on port 4000.");
});
