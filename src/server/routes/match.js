const mongoose = require('mongoose');

const User = mongoose.model('users');

module.exports = (app) => {
  app.get("/api/match", async (req, res) => {
    console.log(req.session.id)
    const id = req.session.id;
    console.log("ID:", id)

    const currUser = await User.findOne({ id: id });
    console.log(currUser);
    if(currUser == null) res.status(404).send("User not found.");

    var artistIds = []
    currUser.top_artists.forEach(artist => {
      artistIds.push(artist.id);
    });

    var showIds = []
    currUser.top_shows.forEach(show => {
      showIds.push(show.id);
    });

    var artistIntersection = await User.aggregate([
      { $unwind: "$top_artists" },
      { $match: { "top_artists.id": { $in: artistIds }}},
      { $group: { 
        _id: "$_id", 
        name: { "$first": "$display_name" },
        number: { $sum: 1 }, 
        artists: { $push: { id: "$top_artists.id", name: "$top_artists.name" }}
      }},
      { $sort: { number: -1 }}
    ]);

    var showsIntersection = await User.aggregate([
      { $unwind: "$top_shows" },
      { $match: { "top_shows.id": { $in: showIds }}},
      { $group: { 
        _id: "$_id",
        name: { "$first": "$display_name" }, 
        number: { $sum: 1 }, 
        hosts: { $push: { id: "$top_shows.id", name: "$top_shows.name" }}
      }},
      { $sort: { number: -1 }}
    ]);

    filteredArtistIntersection = artistIntersection.filter(artistMatch => {
      return String(artistMatch._id) !== String(currUser._id)
    });
    filteredShowIntersection = showsIntersection.filter(showMatch => {
      return String(showMatch._id) !== String(currUser._id)
    });

    topArtistMatch = filteredArtistIntersection[0];
    topShowMatch = filteredShowIntersection[0];

    res.status(200).send([
      topArtistMatch,
      topShowMatch
    ]);
  });
};