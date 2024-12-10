import type {Knex} from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('event_team_players', (table) => {
        table.increments('id').primary();
        table.integer('event_id').unsigned().references('id').inTable('events').onDelete('CASCADE'); // Foreign key to events table
        table.integer('team_id').unsigned();
        table.integer('player_id').unsigned();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('event_team_players'); // Drops the table
}
