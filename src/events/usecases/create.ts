import {create} from '../event.repository';

/**
 * Create a new event.
 *
 * @param   {Object}  payload
 * @returns {Promise}
 */
export const store = async (payload:any): Promise<any> => {
  try {
    return await create(payload?.title);
  } catch (err) {
    throw err;
  }
};
