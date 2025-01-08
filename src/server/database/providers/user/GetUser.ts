import { SQLErrors } from '../../../shared/enum/ErrorCodesSQL';
import { IUserResponse } from '../../../shared/types';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export interface IUser {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string | null;
    password: string;
    createdAt?: string;
    updatedAt?: string;
    roles?: string[];
}

export const getUser = async (
    query: Record<string, string>
): Promise<IUserResponse> => {
    const [type] = Object.keys(query);
    const identifier = query[type];
    try {
        const result: any = await Knex(ETableNames.users)
            .select(
                `${ETableNames.users}.*`,
                Knex.raw(`GROUP_CONCAT(${ETableNames.roles}.roleName) as roles`)
            )
            .where(`${ETableNames.users}.${type}`, '=', identifier)
            .join(
                ETableNames.usersRoles,
                `${ETableNames.usersRoles}.userId`,
                '=',
                `${ETableNames.users}.id`
            )
            .join(
                ETableNames.roles,
                `${ETableNames.usersRoles}.roleId`,
                '=',
                `${ETableNames.roles}.id`
            )
            .groupBy(`${ETableNames.users}.id`)
            .first();
        if (result) {
            result.roles = result.roles ? result.roles.split(',') : [];
            return result;
        }
        throw new Error(SQLErrors.NOT_FOUND_REGISTER);
    } catch (error: any) {
        throw new Error(error.message);
    }
};
