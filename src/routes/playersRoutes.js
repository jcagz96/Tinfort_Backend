const playersRoutes = require('express').Router();
const PlayersController = require('../controllers/playersController');
const verify = require('./verifyToken');
const LikeController = require('../controllers/LikeController');
const DislikeController = require('../controllers/DislikeController');


playersRoutes.get('/', verify, PlayersController.index);
playersRoutes.post('/:playerId/likes', LikeController.store);
playersRoutes.post('/:playerId/dislikes', DislikeController.store);


module.exports = playersRoutes;