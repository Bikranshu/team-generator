import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('events', function (table) {
            table.increments('id').primary();
            table.string('title', 255).notNullable();
            table.string('public_link', 255).notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('event_team_players');
}

