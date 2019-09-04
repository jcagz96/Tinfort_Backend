const registerRoutes = require('express').Router();
const RegisterController = require('../controllers/RegisterController');

const multer = require('multer');              
const multerConfig = require('../config/multer');

registerRoutes.post('/', multer(multerConfig).single('file'), RegisterController.store);


module.exports = registerRoutes;
