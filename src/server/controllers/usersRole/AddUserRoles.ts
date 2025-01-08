import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { IUsersRoles } from '../../database/models/UserRoles';
import { UsersRolesProviders } from '../../database/providers/usersRole';
import { sendErrorResponse } from '../../shared';
import { validation } from '../../shared/middleware';

export const addUserRolesValidation = validation(getSchema => ({
    params: getSchema<Omit<IUsersRoles, 'createdAt' | 'roleName'>>(
        yup.object().shape({
            roleId: yup.string().required(),
            userId: yup.string().required()
        })
    )
}));

export const addUserRoles = async (
    req: Request<Omit<IUsersRoles, 'createdAt'>>,
    res: Response
) => {
    const AddRoleProps: Omit<IUsersRoles, 'createdAt'> = {
        userId: req.params.userId,
        roleId: req.params.roleId
    };

    const result = await UsersRolesProviders.addUserRoles(AddRoleProps);

    if (result instanceof Error) {
        return sendErrorResponse(res, StatusCodes.BAD_GATEWAY, result.message);
    }

    return res.sendStatus(StatusCodes.OK);
};
