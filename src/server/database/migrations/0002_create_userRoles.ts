import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export const up = async (knex: Knex) => {
    return knex.schema
        .createTable(ETableNames.usersRoles, table => {
            table.uuid('roleId').notNullable();
            table.uuid('userId').notNullable();
            table
                .foreign('roleId')
                .references('id')
                .inTable(ETableNames.roles)
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT');
            table
                .foreign('userId')
                .references('id')
                .inTable(ETableNames.users)
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT');
            table.timestamp('createdAt').defaultTo(knex.fn.now());

            table.comment('Tabela usada para armazenar permissão de usuários');
        })
        .then(() => {
            console.log(`# Create table ${ETableNames.usersRoles}`);
        });
};

export const down = async (knex: Knex) => {
    return knex.schema.dropTable(ETableNames.usersRoles).then(() => {
        console.log(`# Drop table ${ETableNames.usersRoles}`);
    });
};
