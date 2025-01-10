import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';

export const up = async (knex: Knex) => {
    return knex.schema
        .createTable(ETableNames.legalities, table => {
            table.increments('id').primary();
            table
                .uuid('card_id')
                .references('id')
                .inTable('cards')
                .onDelete('CASCADE');
            table.string('format', 50).notNullable();
            table.string('status', 50).notNullable();
            table.timestamps(true, true);
        })
        .then(() => {
            console.log(`# Create table ${ETableNames.legalities}`);
        });
};
export const down = async (knex: Knex) => {
    return knex.schema.dropTable(ETableNames.legalities).then(() => {
        console.log(`# Drop table ${ETableNames.legalities}`);
    });
};
