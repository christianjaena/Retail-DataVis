const postgres = require("../../database/postgres");

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

module.exports = { get_retailData };
