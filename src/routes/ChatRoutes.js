const ChatRoutes = require('express').Router();
const ChatController = require('../controllers/ChatController')

ChatRoutes.post('/',ChatController.store)




module.exports = ChatRoutes;