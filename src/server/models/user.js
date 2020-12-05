const mongoose = require('mongoose');
const artistSchema = require('./artist');
const showSchema = require('./show');

const userSchema = new mongoose.Schema(
    {
        id: String,
        display_name: String,
        spotify_url: String,
        href: String,
        type: String,
        uri: String,
        images : [
            {
                url: String,
                height: Number,
                width: Number
            }
        ],
        top_artists: [artistSchema],
        top_shows: [showSchema]
    }, {
        toJSON: {
            transform(_, ret) {
                delete ret._id;
            }
        }
    }
);

mongoose.model('users', userSchema);