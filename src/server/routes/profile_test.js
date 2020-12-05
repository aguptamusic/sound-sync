const mongoose = require('mongoose');

module.exports = (app) => {
    app.post("/api/profile", async (req, res) => {
        const User = mongoose.model('users');

        const user = {
            id: "user_id",
            display_name: "luketchang",
            spotify_url: "spotifyurl.com",
            href: "href?",
            type: "user",
            uri: "myuri",
            images: [{
                url: "imageurl.com",
                height: 640,
                width: 640
            }],
            top_artists: [],
            top_shows: []
        };
        
        const jsonUser = JSON.stringify(user);
        const parsedUser = JSON.parse(jsonUser)
  
        const newUser = new User({
            id: parsedUser.id,
            display_name: parsedUser.display_name,
            spotify_url: parsedUser.spotify_url,
            href: parsedUser.href,
            type: parsedUser.type,
            uri: parsedUser.uri,
            images: parsedUser.images,
            top_artists: parsedUser.top_artists,
            top_shows: parsedUser.top_shows
        });
        
        await newUser.save();
        res.send(newUser);
    });
  };
  