import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';

export const up = async (knex: Knex) => {
    return knex.schema
        .createTable(ETableNames.cardFace, table => {
            table.increments('face_id').primary(); // ID único da face
            table.string('card_id').notNullable(); // ID da carta (chave estrangeira)
            table.string('name').notNullable(); // Nome da face
            table.string('mana_cost'); // Custo de mana
            table.string('type_line').notNullable(); // Linha de tipo
            table.text('oracle_text'); // Texto oráculo
            table.json('colors'); // Cores da face
            table.string('flavor_text'); // Texto de flavor
            table.string('artist'); // Nome do artista

            // Define a relação com a tabela de cartas
            table
                .foreign('card_id')
                .references('id')
                .inTable('cards')
                .onDelete('CASCADE');
        })
        .then(() => {
            console.log(`# Create table ${ETableNames.cardFace}`);
        });
};
export const down = async (knex: Knex) => {
    return knex.schema.dropTable(ETableNames.cardFace).then(() => {
        console.log(`# Drop table ${ETableNames.cardFace}`);
    });
};
