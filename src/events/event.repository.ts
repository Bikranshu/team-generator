import {v4 as uuidv4} from 'uuid';

import knex from '../platforms/config/knex';
import Event from './event.model';
import Player from '../players/player.model';
import Team from '../teams/team.model';
import app from "../platforms/config/express";
import Boom from "@hapi/boom";

/**
 * Distributes players evenly based on skill levels across teams and associates them with events.
 *
 * @param {Array} players - Array of players with skill levels.
 * @param {Array} teams - Array of teams to distribute players into.
 * @param {Event} event - Event associated with the teams and players.
 * @returns {{ eventTitle: string; publicUrl: string; teams: { teamName: string; players: { name: string; skill: number }[] }[] }}
 */
function distributePlayersToTeamsWithEvent(
    players: Player[],
    teams: Team[],
    event: Event
): {
    eventId: number;
    eventTitle: string;
    publicLink: string;
    teams: { teamName: string; totalSkill: number; players: { serial: number, name: string; skill: number }[] }[];
} {
    // Sort players by skill level in descending order
    const sortedPlayers = [...players].sort((a, b) => b.skill - a.skill);

    const teamAssignments: { teamName: string; totalSkill: number; players: { serial: number, name: string; skill: number }[] }[] =
        teams.map((team) => ({
            teamName: team.title,
            totalSkill: 0,
            players: [],
        }));
    sortedPlayers.forEach((player) => {
        const team = teamAssignments.reduce((minTeam, currentTeam) =>
            currentTeam.totalSkill < minTeam.totalSkill ? currentTeam : minTeam
        );

        team.players.push({
            serial: team.players.length + 1,
            name: player.name,
            skill: player.skill,
        });

        team.totalSkill += player.skill;
    });

    return {
        eventId: event.id,
        eventTitle: event.title,
        publicLink: event.public_link,
        teams: teamAssignments,
    };
}

/**
 * Get a team based on id.
 *
 * @param {string} id - The id to find the team.
 * @throws {Error} Throws an error if the ID is invalid or the query fails.
 * @returns {Promise<Array<{ teamName: string; players: Array<{ name: string; skill: string }> }>>}
 */
export const findByID = async (id: string): Promise<{ eventTitle: string; publicLink: string; teams: { teamName: string; players: { name: string; skill: number }[] }[] }> => {
    try {
        const numericId = parseInt(id, 10);

        if (isNaN(numericId)) {
            throw new Error('Invalid ID: ID must be a number.');
        }

        const event = await Event.query().findById(numericId);
        if (!event) {
            throw Boom.notFound('Event not found.');
        }
        const players: Player[] = await Player.query()
            .select("players.id", "players.name", "players.skill", "event_team_players.team_id")
            .join("event_team_players", "players.id", "event_team_players.player_id")
            .where("event_team_players.event_id", numericId);

        const teams: Team[] = await Team.query()
            .distinct("teams.id", "teams.title")
            .join("event_team_players", "teams.id", "event_team_players.team_id")
            .where("event_team_players.event_id", numericId);

        return distributePlayersToTeamsWithEvent(players, teams, event);
    } catch (err) {
        throw err;
    }
};

/**
 * Create an event and distribute players among teams.
 *
 * @param {string} eventTitle - The name of the event.
 * @returns {Promise<{ players: Player[]; teams: Team[]; eventTitle: string; publicLink: string }>}
 */
export const create = async (
    eventTitle: string
): Promise<{
    players: Player[];
    teams: Team[];
    eventId: number | undefined;
    eventTitle: string;
    publicLink: string;
}> => {
    const publicLink = `http://${app.get('host')}:${app.get('port')}/${uuidv4()}`;
    const players: Player[] = await Player.query().select("*").orderBy("skill", "desc");
    const teams: Team[] = await Team.query().select("*");
    if (teams.length === 0) {
        throw new Error("No teams available.");
    }

    const teamAssignments: { [teamId: number]: Player[] } = {};

    teams.forEach((team) => {
        teamAssignments[team.id] = [];
    });

    players.forEach((player, index) => {
        const teamIndex = index % teams.length;
        const teamId = teams[teamIndex].id;
        teamAssignments[teamId].push(player);
    });
    let eventId: number | undefined = undefined;
    await knex.transaction(async (trx) => {
        const event = await knex("events")
            .insert({
                title: eventTitle,
                public_link: publicLink,
            })
            .transacting(trx)
            .returning("id");

        eventId = Array.isArray(event) ? event[0].id || event[0] : event;
        for (const teamId in teamAssignments) {
            const playerIds = teamAssignments[teamId].map((player) => player.id);
            await knex("event_team_players")
                .insert(
                    playerIds.map((playerId) => ({
                        team_id: teamId,
                        player_id: playerId,
                        event_id: eventId,
                    }))
                )
                .transacting(trx);
        }
    });

    return {
        players,
        teams,
        eventId,
        eventTitle,
        publicLink,
    };
};

/**
 * Get a team based on id.
 *
 * @param {string} uuid - The id to find the team.
 * @throws {Error} Throws an error if the ID is invalid or the query fails.
 * @returns {Promise<Array<{ teamName: string; players: Array<{ name: string; skill: string }> }>>}
 */
export const findByUuid = async (uuid: string): Promise<{ eventTitle: string; publicLink: string; teams: { teamName: string; players: { name: string; skill: number }[] }[] }> => {
    try {

        const event = await Event.query().findOne({public_link: uuid});
        if (!event) {
            throw Boom.notFound('Event not found.');
        }
        const players: Player[] = await Player.query()
            .select("players.id", "players.name", "players.skill", "event_team_players.team_id")
            .join("event_team_players", "players.id", "event_team_players.player_id")
            .where("event_team_players.event_id", event.id);

        const teams: Team[] = await Team.query()
            .distinct("teams.id", "teams.title")
            .join("event_team_players", "teams.id", "event_team_players.team_id")
            .where("event_team_players.event_id", event.id);

        return distributePlayersToTeamsWithEvent(players, teams, event);
    } catch (err) {
        throw err;
    }
};
