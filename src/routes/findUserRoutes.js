const findUserRoutes = require('express').Router();
const FortniteApiController = require('../controllers/FortniteApiController')

findUserRoutes.post('/',FortniteApiController.show)




module.exports = findUserRoutes;