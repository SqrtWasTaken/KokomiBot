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
    items: {
        sangoPearls: { type: Number, default: 0},
        dewOfRepudiation: {type: Number, default: 0},
        specter1: { type: Number, default: 0},
        specter2: { type: Number, default: 0},
        specter3: { type: Number, default: 0},
    },
    
    progression: {
        xp: { type: Number, default: 0 },
        ascended: { type: Boolean, default: false },
        weapon: { type: String, default: '' },
        
    }
})

module.exports = mongoose.model('ProfileModels', schema, 'ProfileModels');