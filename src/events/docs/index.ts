import schemas from './schemas';
import create from './create';
import searchById from './search.id';
import searchByUuid from './search.uuid';

export default {
  schemas,
  paths: {
    '/events': { ...create },
    '/events/{id}': { ...searchById },
    '/events/detail/{public_link}': { ...searchByUuid },
  },
};
