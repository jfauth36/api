const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
app.use(express.json());

app.listen(3333, () => {
  console.log(`Server is running or port 3333`);
});

let senha = "admin";
let hash = bcrypt.hash(senha, 10);
let nova = hash;
console.log(nova);
