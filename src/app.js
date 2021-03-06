/* eslint-disable import/extensions */
import express from 'express';

import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import indexRouter from './routes/index.js';

import ErrorHandler from './ErrorHelpers/ErrorHandler.js';
import { sendErrorResponse } from './utils/sendResponses.js';

// logs with wiston
import wiston from './ErrorHelpers/WistonLogger.js';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const app = express();

// add stream option to morgan
app.use(morgan('combined', { stream: wiston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', indexRouter);

// catch 404 and forward to error handler
app.all('/*', (req, res) => {
  wiston.error( `404 -${res.message || 'Route not found'} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(404).send({
    status: 'error',
    error: 'This route is unavailable on this server',
  });
});

// get the unhandled rejection and throw it to another fallback handler we already have.
process.on('unhandledRejection', (error, promise) => {
  throw error;
});

// handle any uncaught exceptions
process.on('uncaughtException', (error) => {
  ErrorHandler.handleError(error);
  if (!ErrorHandler.isTrustedError(error)) {
    process.exit(1);
  }
});

// error handler
app.use(async (err, req, res, next) => {
  if (err instanceof Error) {
    wiston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    if (ErrorHandler.isTrustedError(err)) {
      await ErrorHandler.handleError(err, res);
    } else {
      sendErrorResponse(res, err.status || 500, err.message);
    }
  } else {
    next(err);
  }
});

export default app;
