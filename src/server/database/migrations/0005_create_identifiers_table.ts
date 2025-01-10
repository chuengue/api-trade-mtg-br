import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';

export const up = async (knex: Knex) => {
    return knex.schema
        .createTable(ETableNames.identifiers, table => {
            table.increments('id').primary();
            table
                .uuid('card_id')
                .references('id')
                .inTable('cards')
                .onDelete('CASCADE');
            table.string('identifier_name', 50).notNullable();
            table.string('identifier_value', 255).notNullable();
            table.timestamps(true, true);
        })
        .then(() => {
            console.log(`# Create table ${ETableNames.identifiers}`);
        });
};
export const down = async (knex: Knex) => {
    return knex.schema.dropTable(ETableNames.identifiers).then(() => {
        console.log(`# Drop table ${ETableNames.identifiers}`);
    });
};
