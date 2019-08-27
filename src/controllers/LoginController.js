const jwt =  require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Profile = require('../models/Profile');


module.exports = {
    async show(req,res){
        //finding the user giving his email
        const user = await Profile.findOne({email: req.body.email})

        if( !user ) return res.status(400).send('Email was not found');

        //password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password);  //checking if the passed password is equal to the one in the database
        if(!validPass) return res.status(400).send('Invalid password');

        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);  //1º argument : passando o id para ter acesso a ele depois de fazer loggin | 2º argumento é o token secret
        res.header('auth-token', token).send({"mensagem": "login bem sucedido", "token": token});
    }
}


