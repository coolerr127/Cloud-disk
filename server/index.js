const express = require("express");
const mongoose = require("mongoose").default;
const config = require("config");

const authRouter = require("./routes/auth.routes");

const app = express();
const PORT = config.get("serverPort");

app.use(express.json());
app.use("/api/auth", authRouter);

const onStart = () => {
  console.log(`Server started on port ${PORT}`);
};

const start = async () => {
  try {
    await mongoose.connect(config.get("dbUrl"));

    app.listen(PORT, onStart);
  } catch (e) {
    console.error(e);
  }
};

start().then();
