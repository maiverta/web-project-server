const mongoose = require('mongoose');


const mapSchema = new mongoose.Schema({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    src: {
        type: String,
        required: true
    },
});


const Map = mongoose.model('Map', mapSchema);
module.exports = Map;

