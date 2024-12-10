import player from '../../../players/docs';
import team from '../../../teams/docs';
import event from '../../../events/docs';

/**
 * import the paths to be used here
 */
export default {
  paths: {
    ...player.paths,
    ...team.paths,
    ...event.paths,
  },
};
