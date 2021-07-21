const postgres = require('../../database/postgres');

const add_to_cart = async (req, res) => {
  try {
    const { userID, description, quantity, total } = req.body;
    const addToCart = await postgres.query(
      'INSERT INTO "Cart"("UserID", "Description", "Quantity", "Total") VALUES ($1,$2,$3,$4) RETURNING *',
      [userID, description, quantity, total]
    );
    res.status(200).json(addToCart.rows[0]);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

const cart_items = async (req, res) => {
  try {
    const { userID } = req.body;
    const cartItems = await postgres.query(
      'SELECT * FROM "Cart" WHERE "UserID"=$1',
      [userID]
    );
    res.status(200).json(cartItems.rows);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

module.exports = { add_to_cart, cart_items };
