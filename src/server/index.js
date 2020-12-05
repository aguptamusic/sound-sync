const express = require("express");

const app = express();

require("./routes/auth")(app);
require("./routes/match")(app);

app.get("*", (req, res) => {
  res.send("Home Page");
});

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});
