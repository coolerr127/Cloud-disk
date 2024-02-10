const express = require("express");
const mongoose = require("mongoose").default;
const config = require("config");

const authRouter = require("./routes/auth.routes");
const fileRouter = require("./routes/file.routes");

const app = express();
const corsMiddleware = require("./middleware/cors.middleware");
const PORT = config.get("serverPort");

app.use(corsMiddleware);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

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
