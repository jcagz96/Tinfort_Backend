const playersRoutes = require('express').Router();
const playersController = require('../controllers/playersController');
const verify = require('./verifyToken');


playersRoutes.get('/', verify, playersController.index);


module.exports = playersRoutes;