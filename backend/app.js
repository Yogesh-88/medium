const express = require('express');
const cors = require('cors');
const { StatusCodes } = require('http-status-codes');
const router = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.get('/ping', (req, res) => {
  res.status(StatusCodes.OK).json({
    msg: 'Pong',
  });
});

module.exports = app;
