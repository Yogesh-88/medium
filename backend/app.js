const express = require('express');
const cors = require('cors');
const { StatusCodes } = require('http-status-codes');
const apiRouter = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
  res.status(StatusCodes.OK).json({
    msg: 'Pong',
  });
});

module.exports = app;
