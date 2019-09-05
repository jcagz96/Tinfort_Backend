const axios = require('axios');
const Profile = require('../models/Profile');

module.exports = {                                                    // allows to list registered players that don't had interacted yet ( liked or disliked)
    async index(req, res){
        const { user } = req.headers;

        const loggedPlayer = await Profile.findById(user);

        const users = await Profile.find({
            $and: [
                { _id : { $ne: user }},
                { _id : { $nin: loggedPlayer.likes }},
                { _id : { $nin: loggedPlayer.dislikes }},
                
            ]
        })
        return res.json(users);
    }
}