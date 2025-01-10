import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';

export const up = async (knex: Knex) => {
    return knex.schema
        .createTable(ETableNames.cards, table => {
            table.uuid('id').primary();
            table.uuid('oracle_id').notNullable();
            table.string('name', 255).notNullable();
            table.string('lang', 5).notNullable();
            table.date('released_at');
            table.string('layout', 50);
            table.boolean('highres_image').defaultTo(false);
            table.string('mana_cost', 50);
            table.decimal('cmc', 5, 2);
            table.string('type_line', 255);
            table.string('foil');
            table.string('nonfoil');
            table.json('color_identity');
            table.json('keywords');
            table.string('edhrec_rank ');
            table.string('rulings_uri');
            table.text('oracle_text');
            table.string('power', 10);
            table.string('toughness', 10);
            table.string('rarity', 50);
            table.uuid('set_id').notNullable();
            table.string('set', 10).notNullable();
            table.string('set_name', 255).notNullable();
            table.string('collector_number', 10);
            table.string('artist', 255);
            table.string('frame', 20);
            table.timestamps(true, true);
        })
        .then(() => {
            console.log(`# Create table ${ETableNames.cards}`);
        });
};
export const down = async (knex: Knex) => {
    return knex.schema.dropTable(ETableNames.cards).then(() => {
        console.log(`# Drop table ${ETableNames.cards}`);
    });
};
