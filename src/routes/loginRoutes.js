const loginRoutes = require('express').Router();
const LoginController = require('../controllers/LoginController');

loginRoutes.post('/',LoginController.show)




module.exports = loginRoutes;
