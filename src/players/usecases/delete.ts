import {destroyById} from "../player.repository";


/**
 * delete a player data.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export const destoryById = async (id: string) => {
  try {
    return await destroyById(id);
  } catch (err) {
    throw err;
  }
};
