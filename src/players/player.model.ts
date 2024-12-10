import { Model, ModelOptions, QueryContext } from 'objection';
import moment from 'moment';

import knex from '../platforms/config/knex';

Model.knex(knex);

/**
 * User model.
 */
class Player extends Model {
    id!: number;
    name!: string;
    skill!: number;
    updated_at?: string;

    /**
     * Get table name.
     */
    static get tableName(): string {
        return 'players';
    }

    $beforeUpdate(options: ModelOptions, context: QueryContext): void {
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}

export default Player;
