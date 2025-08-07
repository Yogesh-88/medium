const express = require('express');
const cors = require('cors');
const { StatusCodes } = require('http-status-codes');
const apiRouter = require('./routes');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./config');

const { rateLimitter, notFound, globalErrorHandler, morganMiddleware } = require('./middlewares');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morganMiddleware);
app.use(rateLimitter);
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', apiRouter);

app.get('/ping', (_req, res) => {
  res.status(StatusCodes.OK).json({
    msg: 'Pong',
  });
});

app.use(notFound);

app.use(globalErrorHandler);

module.exports = app;
