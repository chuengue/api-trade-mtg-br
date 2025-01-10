import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';

export const up = async (knex: Knex) => {
    return knex.schema
        .createTable(ETableNames.prices, table => {
            table.increments('id').primary();
            table
                .uuid('card_id')
                .references('id')
                .inTable('cards')
                .onDelete('CASCADE');
            table.string('currency', 10).notNullable();
            table.decimal('price', 10, 2);
            table.boolean('foil').defaultTo(false);
            table.timestamps(true, true);
        })
        .then(() => {
            console.log(`# Create table ${ETableNames.prices}`);
        });
};
export const down = async (knex: Knex) => {
    return knex.schema.dropTable(ETableNames.prices).then(() => {
        console.log(`# Drop table ${ETableNames.prices}`);
    });
};
