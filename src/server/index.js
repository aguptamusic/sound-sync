const express = require("express");

const app = express();

require("./routes/auth")(app);

app.get("/api/match", async (req, res) => {
  res.status(200).send({});
});

app.get("*", (req, res) => {
  res.send("Home Page");
});

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});
