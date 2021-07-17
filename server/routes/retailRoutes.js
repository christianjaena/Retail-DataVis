const express = require('express')
const route = express.Router()
const { get_retailData, get_items } = require('../controllers/retailControllers')

route.get('/', get_retailData)
route.get('/items', get_items);

module.exports = route
