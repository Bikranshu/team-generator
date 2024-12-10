import express from 'express';

import validate from '../platforms/config/joi.validate';
import * as teamCtrl from './team.controller';
import teamSchema from './team.validator';

const router = express.Router();

router.route('/').post(validate(teamSchema.addOrUpdate, 'body'), teamCtrl.store);

router.route('/search').get(teamCtrl.findAll);

router
  .route('/:id')
  .get(validate(teamSchema.searchDetail, 'params'), teamCtrl.findByID)

router.route('/:id').delete( teamCtrl.destroy);

export default router;
