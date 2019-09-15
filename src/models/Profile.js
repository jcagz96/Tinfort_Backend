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
    plataform: {
        type: String,
        required: true,
    },
    profilePicUrl: {
        type: String,
        default: "",
    },
    key: String,
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


ProfileSchema.pre('save', function(){
    if(!this.profilePicUrl){
        this.profilePicUrl = `${process.env.APP_URL}/files/${this.key}`;                        //se tivesse feito array function nao tinha acesso ao this
    }
});



module.exports = mongoose.model('Profile', ProfileSchema);

