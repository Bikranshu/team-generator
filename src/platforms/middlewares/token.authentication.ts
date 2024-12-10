import { Request, Response, NextFunction } from 'express';

/**
 * Validate application jwt was provided in the request
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 */

export default async (req: Request, res: Response, next: NextFunction) => {
  const publicEndpoints = [
      'swagger/index.html',
      '/v1/ping'
  ]; // List of endpoints that doesn't require auth

  if (publicEndpoints.some((path) => path === req.path || req.path.includes(path))) {
    return next();
  }

  const authorizationHeader = req.headers.authorization;
  let token: any;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  return next();
};
