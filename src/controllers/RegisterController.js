const Profile = require('../models/Profile');
const bcrypt = require('bcryptjs');
const Fortnite = require("fortnite-api");

const { Client, Communicator, FriendStatus } = require('fortnite-basic-api');

const axios = require('axios')

module.exports = {
    async store(req, res) {
        const { key, location: profilePicUrl = "" } = req.file;
        const { name, fortniteUsername, password, email, plataform, file } = req.body;



        console.log(`[ RegisterController.js ]  -  ${name},  ${email}  ,  ${fortniteUsername} , ${password}  ,  ${profilePicUrl} , ${plataform}`);

        var errors = {};

        const userExists = await Profile.findOne({
            $or: [
                { email: email },
                { fortniteUsername: fortniteUsername }
            ]
        })

        if (userExists) {
            errors['errorUsername'] = "username or email already registered";
            return res.json(errors)
        }

        const client = new Client({
            email: email,
            password: password,
            launcherToken: process.env.CLIENT_LAUNCHER_TOKEN,
            fortniteToken: process.env.FORTNITE_CLIENT_TOKEN,
        });


        await client.login().then(logino => {
            if (logino.success) {
                console.log(`[ RegisterController.js ]  -  Login Bem sucedido, logo a conta existe`)
            }
            if (logino.error) {
                console.log(logino.error.message)
                console.log(`[ RegisterController.js ]  -  Login Falhou, logo esta ou nao existe ou tem as credenciais erradas`)
                errors['errorLoginFailed'] = "login failed | cause: bad credentials maybe";
            }
        })

        /*
        (async () => {

            const login = await client.login();

            if (login.success) {
                console.log(`[ RegisterController.js ]  -  Login Bem sucedido, logo a conta existe`)
            }
            if (login.error) {
                console.log(login.error.message)
                console.log(`[ RegisterController.js ]  -  Login Falhou, logo esta ou nao existe ou tem as credenciais erradas`)
                errors['errorLoginFailed'] = "login failed | cause: bad credentials maybe";
            }
        })(); */

        const url = `${process.env.APP_URL}/finduser`

        var response = await axios.post(url, {
            username: fortniteUsername,
            plataform: plataform,
        })


        if (response.data.error === "Player Not Found") {
            errors['errorUsername'] = "username not found";
        }
        else {
            console.log(`[ RegisterController.js ]  -  o username: ${fortniteUsername} existe`)
        }

        if (Object.keys(errors).length > 0) {

            return res.json(errors)
        }
        else {
            console.log(`[ RegisterController.js ]  -   0 errors`)

            const salt = await bcrypt.genSalt(10);
            const hashedpassword = await bcrypt.hash(req.body.password, salt);

            console.log(`[ RegisterController.js ]  -  hashedPassword:  ${hashedpassword}`);

            const profile = await Profile.create({
                name,
                fortniteUsername,
                email,
                password: hashedpassword,
                plataform,
                profilePicUrl,
                key,
            })

            console.log(`[ RegisterController.js ]  -   Sucess: user registered in database`)

            return res.json(profile)
        }
    }
}