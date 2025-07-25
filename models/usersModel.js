const connection = require("./connection");

const getUser = async (username) => {
  const [rows] = await connection.execute(
    " SELECT * FROM users WHERE username = ? ",
    [username]
  );
  return rows[0];
};

const registerUser = async (username, password) => {
  await connection.execute(
    " INSERT INTO users (username, password, level) VALUES (?, ?, ?) ",
    [username, password, "user"]
  );
};

const deleteUser = async (id) => {
  const removeUser = await connection.execute(
    " DELETE FROM users WHERE id = ? ",
    [id]
  );
  return removeUser;
};

const userLogin = async (username, password) => {
  const [user] = await connection.execute(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password]
  );
  return user[0];
};

module.exports = {
  getUser,
  registerUser,
  deleteUser,
  userLogin,
};
