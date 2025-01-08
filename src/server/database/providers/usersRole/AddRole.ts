import { ProvidersSuccessMessage, SQLErrors } from '../../../shared';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUsersRoles } from '../../models/UserRoles';

export const addUserRoles = async ({
    userId,
    roleId,
    roleName
}: IUsersRoles): Promise<string | Error> => {
    let trx;
    try {
        trx = await Knex.transaction();
        const existingItem = await trx(ETableNames.usersRoles)
            .where({
                userId: userId,
                roleId: roleId
            })
            .first();

        let roleIdToInsert = roleId;
        if (!roleIdToInsert && roleName) {
            const existingRole = await trx(ETableNames.roles)
                .where({
                    roleName: roleName
                })
                .first();

            if (existingRole) {
                roleIdToInsert = existingRole.id;
            } else {
                return new Error('Papel fornecido não encontrado');
            }
        }

        if (!existingItem && !roleIdToInsert) {
            return new Error('Permissão não existe');
        }
        await trx(ETableNames.usersRoles).insert({
            userId: userId,
            roleId: roleIdToInsert
        });
        await trx.commit();
        return ProvidersSuccessMessage.SUCCESS_INSERT;
    } catch (error) {
        trx?.rollback();
        console.error(error);
        return new Error(SQLErrors.GENERIC_DB_ERROR);
    }
};
