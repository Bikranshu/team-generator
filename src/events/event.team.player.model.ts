import { Model, ModelOptions, QueryContext } from 'objection';
import moment from 'moment';

import knex from '../platforms/config/knex';

Model.knex(knex);

/**
 * Team Event model.
 */
class EventTeamPlayer extends Model {
    id!: number;
    event_id!: number;
    team_id!: number;
    player_id!: number;
    updated_at?: string;

    /**
     * Get table name.
     */
    static get tableName(): string {
        return 'event_team_players';
    }

    $beforeUpdate(options: ModelOptions, context: QueryContext): void {
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}

export default EventTeamPlayer;
