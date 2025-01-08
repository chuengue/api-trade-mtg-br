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

export const createValidation = validation(getSchema => ({
    body: getSchema<Omit<IRole, 'id' | 'createdAt'>>(
        yup.object().shape({
            roleName: yup.string().required()
        })
    )
}));

export const create = async (
    req: Request<{}, {}, Omit<IRole, 'id' | 'createdAt'>>,
    res: Response
) => {
    try {
        await roleProviders.create({
            roleName: req.body.roleName
        });

        res.sendStatus(StatusCodes.CREATED);
    } catch (error: any) {
        switch (error.message) {
            case SQLErrors.DUPLICATE_REGISTER:
                return sendErrorResponse(
                    res,
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    TGenericErrors(GenericErrors.DuplicateRegister)
                );
            default:
                return sendErrorResponse(
                    res,
                    StatusCodes.BAD_GATEWAY,
                    TGenericErrors(GenericErrors.InternalServerError)
                );
        }
    }
};
