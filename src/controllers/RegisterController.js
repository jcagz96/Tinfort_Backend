const Profile = require('../models/Profile');
const bcrypt = require('bcryptjs');

module.exports = {
    async store(req,res){

        const { name, fortniteUsername, password, email } = req.body;
        const { location: profilePicUrl = ""} = await req.file;

        console.log(`[ RegisterController.js ]  -  ${name}  ,  ${fortniteUsername} , ${password}  ,  ${profilePicUrl}`);

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password, salt);

        console.log(`[ RegisterController.js ]  -  hashedPassword:  ${hashedpassword}`);

        const profile = await Profile.create({
            name,
            fortniteUsername,
            email,
            password : hashedpassword,
            profilePicUrl,
        })

        res.json(profile)
    }
}