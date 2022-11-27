require("dotenv").config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const route = require("./routes");
const app = express();

const { globalErrorHandler } = require("./utils/error");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(route);

app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});

app.use(globalErrorHandler);

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
