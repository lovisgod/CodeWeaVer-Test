import BaseError from './BaseError';
import HttpStatusCode from './Statuscode';

class ServerError extends BaseError {
  constructor(name,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true, description = 'internal server error') {
    super(name, httpCode, isOperational, description);
  }
}

export default ServerError;
