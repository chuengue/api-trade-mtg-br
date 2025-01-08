import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

const roles = [
    { roleName: 'user' },
    { roleName: 'super_admin' },
    { roleName: 'admin' }
];

export const seed = async (knex: Knex) => {
    const [{ count }] = await knex(ETableNames.roles).count<
        [{ count: number }]
    >('* as count');
    if (!Number.isInteger(count) || Number(count) > 0) return;

    const rolesToInsert = roles.map(role => ({
        roleName: role.roleName
    }));
    await knex(ETableNames.roles).insert(rolesToInsert);
};
