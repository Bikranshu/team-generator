import Player from './player.model';
import Boom from "@hapi/boom";

/**
 * Get all players.
 *
 * @returns {Promise<Team[]>}
 */
export const findAll = async (): Promise<Player[]> => {
    return await Player.query();
};

/**
 * Get a player based on the id.
 *
 * @param   {String|Number}  id - The id to find the player.
 * @throws  {Boom.Boom}  Throws a NotFoundError if the query result is empty.
 * @returns {Promise<Team>}
 */
export const findByID = async (id: string): Promise<Player> => {
    try {
        const numericId = parseInt(id, 10);

        if (isNaN(numericId)) {
            throw new Error('Invalid ID: ID must be a number.');
        }
        const player = await Player.query().findById(numericId).throwIfNotFound();
        if (!player) {
            throw Boom.notFound('Player not found.');
        }
        return player;
    } catch (err) {
        throw err;
    }
};

/**
 * Create or update players.
 *
 * @param   {Partial<Player>[]}  players - The array of player data to insert.
 * @returns {Promise<Player[]>}
 */
export const createOrUpdate = async (players: Partial<Player>[]): Promise<Player[]> => {
    const processedPlayers: Player[] = [];

    for (const player of players) {
        try {
            const {id, name, skill} = player;
            let processedPlayer: Player;
            if (id) {
                processedPlayer = await Player.query()
                    .patchAndFetchById(id, {
                        name: name as string,
                        skill: skill as number,
                    });
            } else {
                // Insert new record if `id` is not provided
                processedPlayer = await Player.query().insert({
                    name: name as string,
                    skill: skill as number,
                });
            }

            processedPlayers.push(processedPlayer);
        } catch (err) {
            throw err;
        }
    }

    return processedPlayers;
};

/**
 * Delete a player.
 *
 * @param   {number}  id - The ID of the player to delete.
 * @returns {Promise<number>} The number of deleted rows.
 */
export const destroyById = async (id: string): Promise<number> => {
    try {
        const numericId = parseInt(id, 10);

        if (isNaN(numericId)) {
            throw new Error('Invalid ID: ID must be a number.');
        }
        return await Player.query().deleteById(id).throwIfNotFound();
    } catch (err) {
        throw err;
    }
};
