const express = require('express')
const route = express.Router()
const { get_retailData, get_items, get_country_sales } = require('../controllers/retailControllers')

route.get('/', get_retailData)
route.get('/items', get_items);
route.get('/country_sales', get_country_sales)

module.exports = route
