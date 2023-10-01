const express = require("express");
// const mongoose = require("mongoose");
const config = require("config");

const app = express();
const PORT = config.get("server");

const onStart = () => {
  console.log(`Server started on port ${PORT}`);
};

const start = () => {
  try {
    app.listen(PORT, onStart);
  } catch (e) {}
};

start();
