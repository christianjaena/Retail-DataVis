const express = require('express');
const route = express.Router();

const {
  checkout_items,
  get_purchases,
} = require('../controllers/invoiceControllers');

route.post('/checkout', checkout_items);
route.post('/purchases', get_purchases);

module.exports = route;
