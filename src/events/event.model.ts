import { Model, ModelOptions, QueryContext } from 'objection';
import moment from 'moment';

import knex from '../platforms/config/knex';

Model.knex(knex);

/**
 * Team Event model.
 */
class TeamEvent extends Model {
    id!: number;
    title!: string;
    public_link!: string;
    updated_at?: string;

    /**
     * Get table name.
     */
    static get tableName(): string {
        return 'events';
    }

    $beforeUpdate(options: ModelOptions, context: QueryContext): void {
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}

export default TeamEvent;
