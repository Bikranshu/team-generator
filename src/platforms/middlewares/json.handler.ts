import Boom from '@hapi/boom';
import _isEmpty from 'lodash/isEmpty';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to handle empty JSON body requests and other edge cases if any.
 *
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
const jsonHandler = (req: Request, res: Response, next: NextFunction) => {
  const { body, method } = req;
  const disallowedHttpHeaders = ['PUT', 'PATCH'];

  if (req.is('application/json') && disallowedHttpHeaders.includes(method) && _isEmpty(body)) {
    throw Boom.badRequest('Empty JSON');
  }

  next();
};

export default jsonHandler;
