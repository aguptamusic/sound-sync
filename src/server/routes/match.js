module.exports = (app) => {
  app.get("/api/match", async (req, res) => {
    res.status(200).send({});
  });
};
