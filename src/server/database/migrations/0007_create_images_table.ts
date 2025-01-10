import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';

export const up = async (knex: Knex) => {
    return knex.schema
        .createTable(ETableNames.images, table => {
            table.increments('id').primary();
            table
                .uuid('card_id')
                .references('id')
                .inTable('cards')
                .onDelete('CASCADE');
            table.string('image_type', 50).notNullable();
            table.string('url', 2083).notNullable();
            table.timestamps(true, true);
        })
        .then(() => {
            console.log(`# Create table ${ETableNames.images}`);
        });
};
export const down = async (knex: Knex) => {
    return knex.schema.dropTable(ETableNames.images).then(() => {
        console.log(`# Drop table ${ETableNames.images}`);
    });
};
