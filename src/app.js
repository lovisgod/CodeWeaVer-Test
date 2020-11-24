const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const { default: BaseError } = require('./ErrorHelpers/BaseError');
const { default: ErrorHandler } = require('./ErrorHelpers/ErrorHandler');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
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
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err instanceof BaseError) {
    if (ErrorHandler.isTrustedError(err)) {
      await ErrorHandler.handleError(err, res);
    } else {
      // render the error page
      res.status(err.status || 500).send(err);
    }
  } else {
    next(err);
  }
});

module.exports = app;
