const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema ({
    name:{
        type: String,
        required: true,
    },
    fortniteUsername: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicUrl: {
        type: String,
        default: ""
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    }],
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Profile', ProfileSchema);

