const axios = require('axios');
const Profile = require('../models/Profile');

module.exports = {
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