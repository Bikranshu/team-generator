import {findByID, findByUuid} from '../event.repository';

/**
 * Search event based on id.
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

/**
 * Search event based on uuid.
 *
 * @param    {Number|String}  uuid
 * @returns {Promise}
 */
export const searchByUuid = async (uuid: string) => {
  try {
    return  await findByUuid(uuid);
  } catch (err) {
    throw err;
  }
};

