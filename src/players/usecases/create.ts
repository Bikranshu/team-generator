import {createOrUpdate} from '../player.repository';

/**
 * Create or update player.
 *
 * @param   {Object}  payload
 * @returns {Promise}
 */
export const store = async (payload:any): Promise<any> => {
  try {
    return await createOrUpdate(payload);
  } catch (err) {
    throw err;
  }
};
