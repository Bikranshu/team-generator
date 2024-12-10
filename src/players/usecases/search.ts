import {findAll, findByID} from '../player.repository';

/**
 * Search all player.
 *
 * @returns {Promise}
 */
export const searchAll = async () => {
  try {
    return await findAll();
  } catch (err) {
    return [];
  }
};

/**
 * Search player based on id.
 *
 * @param    {Number|String}  id
 * @returns {Promise}
 */
export const searchByID = async (id: string) => {
  try {
    return  await findByID(id);
  } catch (err) {
    throw err;
  }
};
