const express = require("express");

const app = express();

require("./routes/auth")(app);
require("./routes/match")(app);
//require("./routes/preferences")(app);
require("./routes/profile")(app);

app.get("*", (req, res) => {
  res.send("Home Page");
});

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});
