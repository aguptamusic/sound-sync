const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
    {
        id: String,
        name: String,
        spotify_url:  String,
        href: String,
        type: String,
        popularity: Number,
        uri: String,
        genres: [String],
        images: [ 
            {
                height: Number,
                url: String,
                width: Number
            }
        ],
    }
);

module.exports = artistSchema;