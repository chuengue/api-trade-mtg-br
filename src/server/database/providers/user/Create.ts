import { PasswordCrypto, SQLErrors } from '../../../shared';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser } from './GetUser';
interface CustomError extends Error {
    code: string;
}
export const create = async (
    user: Omit<IUser, 'id'>
): Promise<void | Error> => {
    let trx;
    try {
        trx = await Knex.transaction();

        const hashedPassword = await PasswordCrypto.hashPassword(user.password);
        user.password = hashedPassword;

        await trx(ETableNames.users).insert(user);
        let roleIdToInsert;
        const [newUser] = await trx(ETableNames.users)
            .select('id')
            .where('email', '=', user.email)
            .limit(1);

        if (!newUser) {
            throw new Error('Falha ao criar usuário');
        }

        const existingRole = await trx(ETableNames.roles)
            .where({
                roleName: 'user'
            })
            .first();

        if (existingRole) {
            roleIdToInsert = existingRole.id;
            await trx(ETableNames.usersRoles).insert({
                userId: newUser.id,
                roleId: roleIdToInsert
            });
        } else {
            return new Error('Papel fornecido não encontrado');
        }

        await trx.commit();
    } catch (error) {
        console.error('Erro durante a criação do usuário:', error);
        if (trx) {
            await trx.rollback();
        }
        const err = error as CustomError;
        if (err.code === SQLErrors.DUPLICATE_REGISTER) {
            return new Error(SQLErrors.DUPLICATE_REGISTER);
        }
        return new Error(SQLErrors.GENERIC_DB_ERROR);
    }
};
