const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    text: {
        type: String,
        trim: true,
        required: true
    },
    imageLink: {
        type: String,
    },
    videoLink: {
        type: String
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        // required: true
    },
    counter: {
        type: Number,
        required: true
    },
    likedByUsers:{
        type: Array,
        default: []
    }

});

postSchema.virtual('url').get(function(){
    return '/post/' + this._id
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post; 