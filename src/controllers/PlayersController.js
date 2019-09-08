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

        const url = `${process.env.APP_URL}/finduser`

        var resultado = []

        let i = null;
        for(i = 0 ; i < users.length ; i++){
            var response =  await axios.post(url, {
                username: users[i].fortniteUsername,
                plataform: users[i].plataform,
            })
            resultado.push({info: users[i], stats : response.data})
        }

        

        return res.json(resultado);
    }
}