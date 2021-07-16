const express = require("express");
const route = express.Router();
const { register_user, login_user } = require('../controllers/userControllers');

route.post('/register', register_user);
route.post('/login', login_user);

module.exports = route
