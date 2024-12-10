import express from 'express';

import validate from '../platforms/config/joi.validate';
import * as playerCtrl from './player.controller';
import playerSchema from './player.validator';

const router = express.Router();

router.route('/').post(validate(playerSchema.addOrUpdate, 'body'), playerCtrl.store);

router.route('/search').get(playerCtrl.findAll);

router
  .route('/:id')
  .get(validate(playerSchema.searchDetail, 'params'), playerCtrl.findByID)

router.route('/:id').delete( playerCtrl.destroy);

export default router;
