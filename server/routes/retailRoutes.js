const express = require('express')
const route = express.Router()
const { get_retailData } = require('../controllers/retailControllers')

route.get('/', get_retailData)

module.exports = route
