const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    serverID: {
        type: String,
        required: true
    },
    sangoPearls: {
        type: Number
    },
    dewOfRepudiation: {
        type: Number
    }
})

module.exports = mongoose.model('ProfileModels', schema, 'ProfileModels');