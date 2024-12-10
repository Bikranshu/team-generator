import {destroyById} from '../team.repository';

/**
 * Delete a team.
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
