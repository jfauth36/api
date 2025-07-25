const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await usersModel.getUser(username);
    if (userExists) {
      return res.status(400).json({ message: "Usuário já existe" });
    } else {
      const hash = await bcrypt.hash(password, 10);
      await usersModel.registerUser(username, hash);

      res.status(201).json({ message: "Usuário cadastrado com sucesso" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao cadastrar usuário" });
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await usersModel.userLogin(username);
    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Senha incorreta" });
      } else {
        res.status(200).json({
          message: "Login bem-sucedido",
          user: { username: user.username },
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao fazer login" });
  }
};

module.exports = {
  registerUser,
  userLogin,
};
