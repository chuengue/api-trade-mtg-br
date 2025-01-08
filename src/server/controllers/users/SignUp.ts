import { validation } from '../../shared/middleware';

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { UsersProviders } from '../../database/providers/user';
import {
    GenericErrors,
    RegisterErrors,
    SQLErrors,
    getErrorMessage,
    sendErrorResponse
} from '../../shared';
import { ISignUpUserBodyProps } from './types';

const TRegisterError = getErrorMessage('Errors.registerErrors');
const TGenericError = getErrorMessage('Errors.genericErrors');

export const signUpValidation = validation(getSchema => ({
    body: getSchema<ISignUpUserBodyProps>(
        yup.object().shape({
            username: yup
                .string()
                .required()
                .min(2)
                .test(
                    'no-at-symbol',
                    'O username não pode conter "@"',
                    value => !value.includes('@')
                ),

            firstName: yup.string().required().min(3),
            lastName: yup.string().required().min(3),
            email: yup.string().required().email().min(5),
            phoneNumber: yup.string().nullable().optional().min(8),
            password: yup.string().required().min(6)
        })
    )
}));

export const signUp = async (
    req: Request<{}, {}, ISignUpUserBodyProps>,
    res: Response
) => {
    const newUser = await UsersProviders.create(req.body);
    if (newUser instanceof Error) {
        switch (newUser.message) {
            case SQLErrors.GENERIC_DB_ERROR:
                return sendErrorResponse(
                    res,
                    StatusCodes.BAD_GATEWAY,
                    TGenericError(GenericErrors.DatabaseConnectionError)
                );
            case SQLErrors.DUPLICATE_REGISTER:
                return sendErrorResponse(
                    res,
                    StatusCodes.BAD_GATEWAY,
                    TRegisterError(RegisterErrors.EmailAlreadyRegistered)
                );
            default:
                return sendErrorResponse(
                    res,
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    newUser.message
                );
        }
    }

    return res.status(StatusCodes.CREATED).send();
};
