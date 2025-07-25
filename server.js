require("dotenv").config();

const express = require("express");
const app = express();
const router = require("./router");
const port = process.env.port;
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running or port ${port}`);
});
