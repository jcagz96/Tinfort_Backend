const loginRoutes = require('express').Router();
const LoginController = require('../controllers/LoginController');
const FortniteApiController = require('../controllers/FortniteApiController')

loginRoutes.post('/',LoginController.show)
loginRoutes.post('/teste',FortniteApiController.show)




module.exports = loginRoutes;
