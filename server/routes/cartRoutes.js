const express = require('express');
const route = express.Router();

const { add_to_cart, cart_items } = require('../controllers/cartControllers');

route.post('/add_to_cart', add_to_cart);
route.post('/cart_items', cart_items)

module.exports = route;
