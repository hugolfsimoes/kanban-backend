const { Router } = require('express');
const UserController = require('./controllers/UserController');

const router = Router();

router.get('/login', UserController.userLogin);


module.exports = { router };