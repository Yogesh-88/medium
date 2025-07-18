const express = require("express");
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.status(StatusCodes.OK).json({
    msg: "Pong",
  });
});

module.exports = app;
