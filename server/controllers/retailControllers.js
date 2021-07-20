const postgres = require('../../database/postgres');

const get_retailData = async (req, res) => {
  try {
    const retailData = await postgres.query(
      'SELECT * FROM "RetailData" LIMIT 50'
    );
    res.status(200).json(retailData.rows);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

const get_items = async (req, res) => {
  try {
    const items = await postgres.query(
      'SELECT "Description", "UnitPrice" FROM "RetailData" LIMIT 50'
    );
    res.status(200).json(items.rows);
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
module.exports = {
  get_retailData,
  get_items,
  get_country_sales,
  get_daily_sales,
  get_weekly_sales,
  get_monthly_sales,
  get_yearly_sales,
};
