import { Request, Response, NextFunction } from 'express';

/**
 * Utility helper for Joi validation.
 *
 * @param  {Object}  schema
 *  @param {String}  property [body, query, params]
 * @return {null|Object}
 */
const validate = (schema: any, property: any): any => {
  return function (req: Request[], res: Response, next: NextFunction) {
    const { error } = schema.validate(req[property], { abortEarly: false });
    if (error) {
      return next(error);
    }
    return next();
  };
};

export default validate;
