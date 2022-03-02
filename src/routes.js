const express = require('express');
const usersRoute = express.Router();
const UserController = require('./controllers/userController');
// const authMiddleware = require('./middlewares/validateJWT');


usersRoute.get('/', UserController.getAllUsers);
usersRoute.post('/register', UserController.createUser);
usersRoute.post('/authenticate', UserController.login);



module.exports = { usersRoute };