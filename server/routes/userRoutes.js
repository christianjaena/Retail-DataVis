const express = require('express');
const route = express.Router();
const {
  register_user,
  login_user,
  get_user_details,
  get_users,
  get_roles
} = require('../controllers/userControllers');

route.post('/register', register_user);
route.post('/login', login_user);
route.post('/user_details', get_user_details);
route.get('/users', get_users)
route.get('/roles', get_roles)

module.exports = route;
