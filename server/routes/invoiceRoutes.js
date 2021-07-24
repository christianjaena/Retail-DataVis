const express = require('express');
const route = express.Router();

const {
  checkout_items,
  get_purchases,
  get_invoices
} = require('../controllers/invoiceControllers');

route.post('/checkout', checkout_items);
route.post('/purchases', get_purchases);
route.get('/invoices', get_invoices)

module.exports = route;
