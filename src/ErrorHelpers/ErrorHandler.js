/* eslint-disable class-methods-use-this */

import { sendErrorResponse } from '../utils/sendResponses';
import BaseError from './BaseError';

class ErrorHandler {
  async handleError(err, res) {
    // handle loggin later
    // await logger.error(
    //   'Error occured',
    //   err,
    // );
    if (err instanceof BaseError) {
      await sendErrorResponse(res, err.httpCode, err.message);
    }
  }

  isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

export default new ErrorHandler();
