import schemas from './schemas';
import create from './create';
import deleteById from './delete.id';
import search from './search';
import searchById from './search.id';

export default {
  schemas,
  paths: {
    '/teams': { ...create },
    '/teams/search': { ...search },
    '/teams/{id}': { ...searchById, ...deleteById },
  },
};
