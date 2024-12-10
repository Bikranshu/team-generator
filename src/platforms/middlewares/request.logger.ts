import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';

import logger from '../config/winston';

export default (req: Request, res: Response, next: NextFunction) => {
  const result = _.omit(req.body, ['login_password', 'new_password', 'confirm_password']);

  const requestBody = typeof result !== 'string' ? JSON.stringify(result) : result;

  logger.log('info', 'Method:' + req.method + ' Path:' + req.path + ' Request Body:' + requestBody);
  logger.log('info', '--------------------------------------------------');

  next();
};
