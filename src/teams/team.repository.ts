import Boom from '@hapi/boom';
import {UniqueViolationError} from 'objection';

import Team from './team.model';
import Player from "../players/player.model";

/**
 * Get all teams.
 *
 * @returns {Promise<Team[]>}
 */
export const findAll = async (): Promise<Team[]> => {
    return await Team.query();
};

/**
 * Get a team based on id.
 *
 * @param   {String|Number}  id - The id to find the team.
 * @throws  {Boom.Boom}  Throws a NotFoundError if the query result is empty.
 * @returns {Promise<Team>}
 */
export const findByID = async (id: string): Promise<Team> => {
    try {
        const numericId = parseInt(id, 10);

        if (isNaN(numericId)) {
            throw new Error('Invalid ID: ID must be a number.');
        }
        const team = await Team.query().findById(numericId);
        if (!team) {
            throw Boom.notFound('Team not found.');
        }
        return team;
    } catch (err) {

        throw err;
    }
};

/**
 * Create or update teams.
 *
 * @param   {Partial<Team>[]}  teams - The array of team data to insert.
 * @returns {Promise<Team[]>}
 */
export const createOrUpdate = async (teams: Partial<Team>[]): Promise<Team[]> => {
    const insertedTeams: Team[] = [];

    for (const team of teams) {
        try {
            const {id, title} = team;
            let processedTeam: Team;
            if (id) {
                processedTeam = await Team.query()
                    .patchAndFetchById(id, {
                        title: title as string,
                    });
            } else {
                // Insert new record if `id` is not provided
                processedTeam = await Team.query().insert({
                    title: title as string,
                });
            }
            insertedTeams.push(processedTeam);
        } catch (err) {
            throw err;
        }
    }

    return insertedTeams;
};

/**
 * Update a team.
 *
 * @param   {string}  id - The ID of the team to update.
 * @param   {Partial<Team>}    team - The updated team data.
 * @returns {Promise<Team>}
 */
export const edit = async (id: string, team: Partial<Team>): Promise<Team> => {
    try {
        return await Team.query().patchAndFetchById(id, team).throwIfNotFound();
    } catch (err) {
        if (err instanceof UniqueViolationError) {
            throw Boom.badRequest('Team already exists in our system.');
        }
        throw err;
    }
};

/**
 * Delete a team.
 *
 * @param   {number}  id - The ID of the team to delete.
 * @returns {Promise<number>} The number of deleted rows.
 */
export const destroyById = async (id: string): Promise<number> => {
    try {
        const numericId = parseInt(id, 10);

        if (isNaN(numericId)) {
            throw new Error('Invalid ID: ID must be a number.');
        }
        return await Team.query().deleteById(id).throwIfNotFound();
    } catch (err) {
        throw err;
    }
};
