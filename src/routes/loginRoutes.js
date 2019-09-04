const loginRoutes = require('express').Router();
const LoginController = require('../controllers/LoginController');
const verify = require('./verifyToken');

loginRoutes.post('/',LoginController.show)


module.exports = loginRoutes;
