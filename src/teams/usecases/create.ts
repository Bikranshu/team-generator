import {createOrUpdate} from '../team.repository';

/**
 * Create or update team.
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
