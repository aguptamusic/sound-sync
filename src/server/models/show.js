const mongoose = require('mongoose');

const showSchema = new mongoose.Schema(
    {
        id: String,
        name: String,
        description: String,
        spotify_url: String,
        href: String,
        media_type: String,
        type: String,
        uri: String,
        images: [
            {
                height: Number,
                url: String,
                width: Number
            }
        ],
    }
);

module.exports = showSchema;