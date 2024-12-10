import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import vendorError from '../utils/third.party.module.error';

/**
 * NOT_FOUND(404) middleware to catch error response
 *
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(HttpStatus.NOT_FOUND).json({
    code: HttpStatus.NOT_FOUND,
    success: false,
    message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
  });
};

/**
 * METHOD_NOT_ALLOWED(405) middleware to catch error response.
 * It should be placed at the very bottom of the middleware stack.
 *
 * @param {Object} req
 * @param {Object} res
 * @param  {Function} next
 */
export const methodNotAllowed = (req: Request, res: Response, next: NextFunction) => {
  res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
    code: HttpStatus.METHOD_NOT_ALLOWED,
    success: false,
    message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED),
  });
};

/**
 * Generic error response middleware
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
export const genericErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const error = vendorError(err);
  return res.status(error.code).json(error);
};
