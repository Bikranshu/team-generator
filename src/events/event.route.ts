import express from 'express';

import validate from '../platforms/config/joi.validate';
import * as eventCtrl from './event.controller';
import eventSchema from "./event.validator";

const router = express.Router();

router.route('/').post(eventCtrl.store);
router
    .route('/:id')
    .get(validate(eventSchema.searchDetail, 'params'), eventCtrl.findByID)

router.route('/detail/:public_link').get( eventCtrl.findByUuid)

export default router;
