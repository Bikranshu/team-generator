import { Request, Response, NextFunction } from 'express';

import * as createUseCase from './usecases/create';
import * as searchUseCase from "./usecases/search";

/**
 * Store new event
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const store = (req: Request, res: Response, next: NextFunction) => {
  createUseCase
    .store(req?.body)
    .then((data) => res.json({ success: true, data }))
    .catch((err) => next(err));
};


/**
 *  Find event data by id
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const findByID = (req: Request, res: Response, next: NextFunction) => {
  searchUseCase
      .searchByID(req?.params?.id)
      .then((data) => res.json({ success: true, data }))
      .catch((err) => next(err));
};

/**
 *  Find event data by public link
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const findByUuid = (req: Request, res: Response, next: NextFunction) => {
  searchUseCase
      .searchByUuid(req?.params?.public_link)
      .then((data) => res.json({ success: true, data }))
      .catch((err) => next(err));
};
