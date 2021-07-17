const postgres = require('../../database/postgres');

const register_user = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const isUser = await postgres.query(
      'SELECT * FROM "Users" WHERE "Email"=$1 AND "Password"=$2 AND "Role"=$3',
      [email, password, role]
    );
    if (isUser.rows[0]) {
      res.status(400).json('User exists');
    } else {
      const newUser = await postgres.query(
        'INSERT INTO "Users"("Email", "Password", "Role") VALUES($1, $2, $3) RETURNING *',
        [email, password, role]
      );
      res.status(200).json('Registered successfully');
    }
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

const login_user = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const isUser = await postgres.query(
      'SELECT * FROM "Users" WHERE "Email"=$1 AND "Password"=$2 AND "Role"=$3',
      [email, password, role]
    );
    if (isUser.rows[0]) {
      res.status(200).json(isUser.rows[0]);
    } else {
      res.status(400).json('No such user found');
    }
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

module.exports = { register_user, login_user };
