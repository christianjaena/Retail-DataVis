const express = require('express');
const route = express.Router();

const {
  checkout_items,
  get_purchases,
  get_invoices,
  get_day_invoice,
  get_day_total,
  get_new_invoice
} = require('../controllers/invoiceControllers');

route.post('/checkout', checkout_items);
route.post('/purchases', get_purchases);
route.get('/invoices', get_invoices);
route.get('/day_invoice', get_day_invoice);
route.get('/day_total', get_day_total)
route.get('/new_invoice', get_new_invoice)

module.exports = route;
