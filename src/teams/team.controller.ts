import { Request, Response, NextFunction } from 'express';

import * as searchUseCase from './usecases/search';
import * as createUseCase from './usecases/create';
import * as deleteUseCase from './usecases/delete';

/**
 * Find all team data
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const findAll = (req: Request, res: Response, next: NextFunction) => {
  searchUseCase
    .searchAll()
    .then((data) => res.json({ success: true, data }))
    .catch((err) => next(err));
};

/**
 *  Find team by id
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
 * Store or update team data
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
 * Delete team by id
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const destroy = (req: Request, res: Response, next: NextFunction) => {
  deleteUseCase
    .destoryById(req?.params?.id)
      .then((data) => res.json({ success: true, message: 'Team deleted successfully.' }))
    .catch((err) => next(err));
};
