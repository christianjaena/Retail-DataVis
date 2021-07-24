const postgres = require('../../database/postgres');

const checkout_items = async (req, res) => {
  try {
    const { userID, description, quantity, total } = req.body;
    const checkout = await postgres.query(
      'INSERT INTO "Invoices"("UserID", "Description", "Quantity", "Total", "InvoiceDate") VALUES ($1,$2,$3,$4,localtimestamp) RETURNING *',
      [userID, description, quantity, total]
    );
    res.status(200).json(checkout.rows);
    console.log(checkout.rows);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

const get_purchases = async (req, res) => {
  try {
    const { userID } = req.body;
    const purchases = await postgres.query(
      'SELECT * FROM "Invoices" WHERE "UserID"=$1',
      [userID]
    );
    res.status(200).json(purchases.rows);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

const get_invoices = async (req, res) => {
  try {
    const invoices = await postgres.query(
      'SELECT COUNT("InvoiceNo") AS "InvoiceCount" FROM "RetailData"'
    );
    res.status(200).json(invoices.rows[0]);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};
module.exports = { checkout_items, get_purchases, get_invoices };
