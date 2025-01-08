import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export const up = async (knex: Knex) => {
    return knex.schema
        .createTable(ETableNames.roles, table => {
            table.uuid('id').defaultTo(knex.fn.uuid()).primary();
            table.string('roleName').notNullable().unique().checkLength('>', 3);
            table.timestamp('createdAt').defaultTo(knex.fn.now());

            table.comment('Tabela usada para armazenar roles do sistema');
        })
        .then(() => {
            console.log(`# Create table ${ETableNames.roles}`);
        });
};
export const down = async (knex: Knex) => {
    return knex.schema.dropTable(ETableNames.roles).then(() => {
        console.log(`# Drop table ${ETableNames.roles}`);
    });
};
