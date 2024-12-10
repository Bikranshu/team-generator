import express from 'express';

import pingRoutes from '../../ping/ping.route';
import playerRoutes from '../../players/player.route';
import teamRoutes from '../../teams/team.route';
import eventRoutes from '../../events/event.route';

const router = express.Router();

router.use('/', pingRoutes);

router.use('/players', playerRoutes);

router.use('/teams', teamRoutes);

router.use('/events', eventRoutes);

export default router;
