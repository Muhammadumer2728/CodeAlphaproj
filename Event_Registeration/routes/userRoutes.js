const routes = require('express').Router();
const UserController = require('../controllers/eventController');

routes.post('/registerUser',UserController.registerUser);
routes.post('/login',UserController.login);

module.exports = routes;