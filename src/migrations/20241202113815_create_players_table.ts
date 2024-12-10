import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('players', function (table) {
            table.increments('id').primary();
            table.string('name', 255).notNullable();
            table.tinyint('skill').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').nullable();
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('players');
}

