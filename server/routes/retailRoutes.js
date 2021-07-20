const express = require('express');
const route = express.Router();
const {
  get_retailData,
  get_items,
  get_country_sales,
  get_daily_sales,
  get_monthly_sales,
  get_weekly_sales,
  get_yearly_sales,
  get_monthly_in_demand_items,
} = require('../controllers/retailControllers');

route.get('/', get_retailData);
route.get('/items', get_items);
route.get('/country_sales', get_country_sales);
route.get('/daily_sales', get_daily_sales);
route.get('/weekly_sales', get_weekly_sales);
route.get('/monthly_sales', get_monthly_sales);
route.get('/yearly_sales', get_yearly_sales);
route.get('/monthly_demand', get_monthly_in_demand_items)

module.exports = route;
