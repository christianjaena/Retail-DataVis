const postgres = require('../../database/postgres');

const get_retailData = async (req, res) => {
  try {
    const retailData = await postgres.query('SELECT * FROM "RetailData"');
    res.status(200).json(retailData.rows);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

let itemsList = [];
const get_items = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    if (page === 1) {
      const items = await postgres.query(
        'SELECT "Description", "UnitPrice" FROM "RetailData"'
      );
      itemsList = items.rows;
    }
    const limit = 12;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = itemsList.slice(startIndex, endIndex);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

const get_country_sales = async (req, res) => {
  try {
    const country_sales = await postgres.query(
      'SELECT "Country" AS "CountryInvoice", COUNT("InvoiceNo") AS "Sales" FROM "RetailData" GROUP BY "Country"'
    );
    res.status(200).json(country_sales.rows);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

const get_daily_sales = async (req, res) => {
  try {
    const daily_sales = await postgres.query(
      'SELECT DATE_TRUNC(\'day\', "InvoiceDate") AS "DailyInvoice", SUM("UnitPrice" * "Quantity") AS "Sales" FROM "RetailData" GROUP BY DATE_TRUNC(\'day\', "InvoiceDate") ORDER BY DATE_TRUNC(\'day\', "InvoiceDate")'
    );
    res.status(200).json(daily_sales.rows);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

const get_weekly_sales = async (req, res) => {
  try {
    const weekly_sales = await postgres.query(
      'SELECT DATE_TRUNC(\'week\', "InvoiceDate") AS "WeeklyInvoice", SUM("UnitPrice" * "Quantity") AS "Sales" FROM "RetailData" GROUP BY DATE_TRUNC(\'week\', "InvoiceDate") ORDER BY DATE_TRUNC(\'week\', "InvoiceDate")'
    );
    res.status(200).json(weekly_sales.rows);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

const get_monthly_sales = async (req, res) => {
  try {
    const monthly_sales = await postgres.query(
      'SELECT DATE_TRUNC(\'month\', "InvoiceDate") AS "MonthlyInvoice", SUM("UnitPrice" * "Quantity") AS "Sales" FROM "RetailData" GROUP BY DATE_TRUNC(\'month\', "InvoiceDate") ORDER BY DATE_TRUNC(\'month\', "InvoiceDate")'
    );
    res.status(200).json(monthly_sales.rows);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

const get_yearly_sales = async (req, res) => {
  try {
    const yearly_sales = await postgres.query(
      'SELECT DATE_TRUNC(\'year\', "InvoiceDate") AS "MonthlyInvoice", SUM("UnitPrice" * "Quantity") AS "Sales" FROM "RetailData" GROUP BY DATE_TRUNC(\'year\', "InvoiceDate") ORDER BY DATE_TRUNC(\'year\', "InvoiceDate")'
    );
    res.status(200).json(yearly_sales.rows);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

const get_monthly_in_demand_items = async (req, res) => {
  try {
    const monthly_in_demand_items = await postgres.query(
      'SELECT * FROM (SELECT "Description", DATE_TRUNC(\'month\', "InvoiceDate") AS "Month", "Quantity", ROW_NUMBER() OVER (PARTITION BY DATE_TRUNC(\'month\',"InvoiceDate") ORDER BY "Quantity" DESC) AS "MonthlyRank" FROM "RetailData" GROUP BY "Description", "Month", "Quantity") "Ranks" WHERE "MonthlyRank" <= 10;'
    );
    res.status(200).json(monthly_in_demand_items.rows);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

const get_item_prices = async (req, res) => {
  try {
    const item_prices = await postgres.query(
      'SELECT DISTINCT "Description", "UnitPrice" FROM "RetailData" WHERE "Description" != \'AMAZON FEE\' AND "Description" != \'Manual\' AND "Description" != \'DOTCOM POSTAGE\' AND "Description" != \'Adjust bad debt\' AND "Description" != \'Discount\' AND "Description" != \'POSTAGE\' AND "Description" != \'Bank Charges\' AND "Description" != \'CRUK Commission\' AND "Description" != \'SAMPLES\' AND "Description" != \'CARRIAGE\' ORDER BY "UnitPrice" DESC LIMIT 50'
    );
    res.status(200).json(item_prices.rows);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

module.exports = {
  get_retailData,
  get_items,
  get_country_sales,
  get_daily_sales,
  get_weekly_sales,
  get_monthly_sales,
  get_yearly_sales,
  get_monthly_in_demand_items,
  get_item_prices,
};
