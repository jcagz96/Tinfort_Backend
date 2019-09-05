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

        if(targetPlayer.likes.includes(user)){
            console.log("IT'S A MATCH!!!");
        }

        loggedPlayer.likes.push(targetPlayer._id);

        await loggedPlayer.save();

        console.log(`[ LikeController.js ]  -   | ${loggedPlayer.fortniteUsername} liked ${targetPlayer.fortniteUsername} |`);

        return res.json(loggedPlayer);
    }
}