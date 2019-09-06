const Profile = require('../models/Profile');

module.exports = {
    async store(req, res){

        const { playerId } = req.params;
        const { user } = req.headers;

        const loggedPlayer = await Profile.findById(user);
        const targetPlayer = await Profile.findById(playerId);

        if(!targetPlayer){
            return res.status(400).json({error : 'Player Not Exists'});
        }

        if(targetPlayer.dislikes.includes(user)){
            console.log(`[ DislikeController.js ]  -   It's a complete dismatch :( ${loggedPlayer.fortniteUsername} and ${targetPlayer.fortniteUsername} `);
        }

        loggedPlayer.dislikes.push(targetPlayer._id);

        await loggedPlayer.save();

        console.log(`[ DislikeController.js ]  -   | ${loggedPlayer.fortniteUsername} disliked ${targetPlayer.fortniteUsername} |`);

        return res.json(loggedPlayer);
    }
}