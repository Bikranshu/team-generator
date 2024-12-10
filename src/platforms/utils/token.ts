import { sign, verify, decode, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import moment from 'moment';
import Boom from '@hapi/boom';

/**
 * Generate token
 *
 * @param {Object} payload
 * @param {Integer} expires in minutes
 * @param {String} [secret]
 * @returns {String}
 */
export const generateToken = (payload: any, expires = 30, secret = (process.env as any).JWT_KEY) => {
  const options = {
    sub: payload.email,
    iat: moment().unix(),
    exp: moment().add(expires, 'minutes').unix(),
  };
  const signOptions = { ...options, ...payload };
  return sign(signOptions, secret);
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 *
 * @param {String} token
 */
export const verifyToken = (token: string) => {
  if (!token) {
    throw Boom.forbidden('No token provided.');
  }
  try {
    return verify(token, (process.env as any).JWT_KEY);
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw Boom.unauthorized('Token has expired.');
    }
    if (err instanceof JsonWebTokenError) {
      throw Boom.badRequest('You are not authorized to perform this operation.');
    }
    throw err;
  }
};

/**
 * Decode token and return token (or null if token is invalid)
 *
 * @param {String} token
 */
export const decodeToken = (token: string) => {
  if (!token) {
    throw Boom.forbidden('Token not found.');
  }
  return decode(token, { complete: true });
};

/**
 * Decode JWT token from request header and return decoded token
 *
 * @param {object} headers
 * @returns {object}
 */
export const decodeHeaderToken = (headers: any) => {
  const token = headers?.authorization?.split(' ')[1];
  return decodeToken(token)?.payload;
};
