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

        if(targetPlayer.likes !== null && targetPlayer.likes.includes(user)){
            console.log(`[ LikeController.js ]  -   IT'S A MATCH!!! Between ${loggedPlayer.fortniteUsername} and ${targetPlayer.fortniteUsername} `);
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[playerId];

            if(loggedSocket){
                req.io.to(loggedSocket).emit('match', targetPlayer);
            }
            if(targetSocket){
                req.io.to(targetSocket).emit('match', loggedPlayer);
            }
        }

        loggedPlayer.likes.push(targetPlayer._id);

        await loggedPlayer.save();

        console.log(`[ LikeController.js ]  -   | ${loggedPlayer.fortniteUsername} liked ${targetPlayer.fortniteUsername} |`);

        return res.json(loggedPlayer);
    }
}