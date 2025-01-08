import { SQLErrors } from '../../../shared/enum/ErrorCodesSQL';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IRole } from '../../models/role';

export const create = async ({ roleName }: Omit<IRole, 'id' | 'createdAt'>) => {
    try {
        const existingItem = await Knex(ETableNames.roles)
            .where({
                roleName: roleName
            })
            .first();

        if (existingItem) {
            throw new Error(SQLErrors.DUPLICATE_REGISTER);
        }
        await Knex(ETableNames.roles).insert({ roleName: roleName });
    } catch (error: any) {
        throw new Error(error.message);
    }
};
