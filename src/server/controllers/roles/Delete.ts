import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { IRole } from '../../database/models/role';
import { roleProviders } from '../../database/providers/roles';
import {
    GenericErrors,
    getErrorMessage,
    sendErrorResponse,
    SQLErrors
} from '../../shared';
import { validation } from '../../shared/middleware';

const TGenericErrors = getErrorMessage('Errors.genericErrors');

export const deleteValidation = validation(getSchema => ({
    params: getSchema<Omit<IRole, 'roleName' | 'createdAt'>>(
        yup.object().shape({
            id: yup.string().required()
        })
    )
}));
export const deleteRole = async (
    req: Request<Omit<IRole, 'roleName' | 'createdAt'>>,
    res: Response
) => {
    try {
        if (!req.headers.roles?.includes('super_admin')) {
            throw Error('OPERATION_NOT_ALLOWED');
        }

        await roleProviders.deleteRole(req.params.id as string);

        return res.sendStatus(StatusCodes.OK);
    } catch (error: any) {
        switch (error.message) {
            case 'OPERATION_NOT_ALLOWED':
                return sendErrorResponse(
                    res,
                    StatusCodes.BAD_REQUEST,
                    TGenericErrors(GenericErrors.OperationNotAllowed)
                );
            case SQLErrors.NOT_FOUND_REGISTER:
                return sendErrorResponse(
                    res,
                    StatusCodes.BAD_REQUEST,
                    TGenericErrors(GenericErrors.RecordNotFound)
                );

            default:
                return sendErrorResponse(
                    res,
                    StatusCodes.BAD_GATEWAY,
                    error.message
                );
        }
    }
};
