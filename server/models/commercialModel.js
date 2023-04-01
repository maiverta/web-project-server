const mongoose = require('mongoose');

const commercialSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    numberOfReviews: {
        type: String,
        required: true
    },
    imageLink: {
        type: String,
    },
    description: {
        type: String,
    }
});


const Commercial = mongoose.models.Commercial || mongoose.model('Commercial', commercialSchema);
module.exports = Commercial; 