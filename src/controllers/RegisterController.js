const Profile = require('../models/Profile');
const bcrypt = require('bcryptjs');
const Fortnite = require("fortnite-api");
const axios = require('axios')

module.exports = {
    async store(req,res){

        const { name, fortniteUsername, password, email, plataform } = req.body;
        const { location: profilePicUrl = ""} = await req.file;

        console.log(`[ RegisterController.js ]  -  ${name},  ${email}  ,  ${fortniteUsername} , ${password}  ,  ${profilePicUrl} , ${plataform}`);

        var errors =  [];

        let fortniteAPI = new Fortnite(
            [
                email,
                password,
                process.env.CLIENT_LAUNCHER_TOKEN,
                process.env.FORTNITE_CLIENT_TOKEN,
            ]
        );

         await fortniteAPI.login().then(() => {
            console.log(`[ RegisterController.js ]  -  Login Bem sucedido, logo a conta existe`)
        }).catch((error)=>{
            console.log(`[ RegisterController.js ]  -  Login Falhou, logo esta ou nao existe ou tem as credenciais erradas`)
            errors.push({"error" : "login failed | cause: bad credentials maybe"})
        })

        const url = `${process.env.APP_URL}/finduser`

        var response =  await axios.post(url, {
            username: fortniteUsername,
            plataform: plataform,
        })


        if(response.data.error === "Player Not Found"){
            errors.push({"error" : "username not found"})
        }
        else{
            console.log(`[ RegisterController.js ]  -  o username: ${fortniteUsername} existe`)
        }

        if(errors.length>0){
            for (var i = 0; i < errors.length; i++) { 
                console.log(`[ RegisterController.js ]  -  ${errors[i].error}`);
            }

            return res.json({errors: errors})
        }
        else{
            console.log(`[ RegisterController.js ]  -   0 errors`)

            const salt = await bcrypt.genSalt(10);
            const hashedpassword = await bcrypt.hash(req.body.password, salt);

            console.log(`[ RegisterController.js ]  -  hashedPassword:  ${hashedpassword}`);

            const profile = await Profile.create({
                name,
                fortniteUsername,
                email,
                password : hashedpassword,
                plataform,
                profilePicUrl,
            })

            console.log(`[ RegisterController.js ]  -   Sucess: user registered in database`)

            return res.json(profile)
        }
    }
}