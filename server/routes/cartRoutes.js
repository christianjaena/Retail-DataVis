const express = require('express');
const route = express.Router();

const { add_to_cart, cart_items, delete_cart_item, get_in_item_cart } = require('../controllers/cartControllers');

route.post('/add_to_cart', add_to_cart);
route.post('/cart_items', cart_items)
route.delete('/delete_cart_item/:id', delete_cart_item)
route.get('/in_item_cart', get_in_item_cart)

module.exports = route;
