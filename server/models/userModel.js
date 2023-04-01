const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String, 
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
});

const User = mongoose.model('User', userSchema);


module.exports = User;