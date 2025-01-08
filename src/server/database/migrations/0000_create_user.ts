import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export const up = async (knex: Knex) => {
    return knex.schema
        .createTable(ETableNames.users, table => {
            table.uuid('id').defaultTo(knex.fn.uuid()).primary();
            table.string('username').notNullable().unique().checkLength('>', 3);
            table.string('firstName').notNullable().checkLength('>', 3);
            table.string('lastName').notNullable().checkLength('>', 3);
            table
                .string('email')
                .index()
                .unique()
                .notNullable()
                .checkLength('>', 5);
            table.string('phoneNumber').nullable().checkLength('>=', 8);
            table.string('password').notNullable().checkLength('>', 6);
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.fn.now());

            table.comment('Tabela usada para armazenar usuários do sistema');
        })
        .then(() => {
            console.log(`# Create table ${ETableNames.users}`);
        });
};

export const down = async (knex: Knex) => {
    return knex.schema.dropTable(ETableNames.users).then(() => {
        console.log(`# Drop table ${ETableNames.users}`);
    });
};
