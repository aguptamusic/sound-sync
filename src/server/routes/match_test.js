const mongoose = require('mongoose');

const User = mongoose.model('users');

module.exports = (app) => {
  app.get("/api/match", async (req, res) => {
    const id = "luketchang";

    const currUser = await User.findOne({ id: id });
    if(currUser.size == 0) res.status(404).send("User not found.");

    const topArtists = currUser.top_artists;
    console.log(topArtists);
    // const intersection = await User.aggregate([
    //   { $unwind: "$top_artists" },
    //   { $match: { top_artists: { $in: topArtists }}},
    //   { $group: { _id: "$_id", number: { $sum: 1 }}},
    //   { $project: { _id: 1, number: 1 }},
    //   { $sort: { number: -1 }}
    // ]);

    // console.log(intersection);

    // res.send(intersection);
  });
};