const postgres = require('../../database/postgres');

const register_user = async (req, res) => {
  try {
    const { email, password, role, country } = req.body;
    const isUser = await postgres.query(
      'SELECT * FROM "Users" WHERE "Email"=$1 AND "Password"=$2 AND "Role"=$3 AND "Country"=$4',
      [email, password, role, country]
    );
    if (isUser.rows[0]) {
      res.status(400).json('User exists');
    } else {
      const newUser = await postgres.query(
        'INSERT INTO "Users"("Email", "Password", "Role", "Country") VALUES($1, $2, $3, $4) RETURNING *',
        [email, password, role, country]
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

const get_user_details = async (req, res) => {
  try {
    let { userID } = req.body;
    const getUser = await postgres.query(
      'SELECT * FROM "Users" WHERE "UserID"=$1',
      [userID]
    );
    res.status(200).json(getUser.rows[0]);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

const get_users = async (req, res) => {
  try {
    const getUsers = await postgres.query(
      'SELECT COUNT(*) AS "UserCount" FROM "Users"'
    );
    res.status(200).json(getUsers.rows[0]);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

const get_roles = async (req, res) => {
  try {
    const getRoles = await postgres.query(
      'SELECT "Role", COUNT(*) FROM "Users" GROUP BY "Role" ORDER BY COUNT(*)'
    );
    res.status(200).json(getRoles.rows);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

module.exports = {
  register_user,
  login_user,
  get_user_details,
  get_users,
  get_roles,
};
