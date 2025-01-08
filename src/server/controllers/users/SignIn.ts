import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { UsersProviders } from '../../database/providers/user';
import {
    GenericErrors,
    getErrorMessage,
    JWTService,
    LoginErrors,
    PasswordCrypto,
    sendErrorResponse,
    SQLErrors,
    validation
} from '../../shared';
import { EJWTErrors } from '../../shared/services/JWTService/types';
import { IUserResponse } from '../../shared/types';
import { sendSuccessResponse } from '../../shared/utils/SendSuccessResponse';
import { ISignInUserBodyProps, ISignInUserBodyPropsValidation } from './types';

const TLoginError = getErrorMessage('Errors.loginErrors');
const TGenericError = getErrorMessage('Errors.genericErrors');

export const signInValidation = validation(getSchema => ({
    body: getSchema<ISignInUserBodyPropsValidation>(
        yup.object().shape({
            identifier: yup.string().required().min(5),
            password: yup.string().required().min(3)
        })
    )
}));

export const signIn = async (
    req: Request<{}, {}, ISignInUserBodyProps>,
    res: Response
) => {
    const { identifier, password } = req.body;

    try {
        let user: IUserResponse | Error;

        if (identifier.includes('@')) {
            user = await UsersProviders.getUser({
                email: req.body.identifier
            });
        } else {
            user = await UsersProviders.getUser({
                username: req.body.identifier
            });
        }

        const passwordMatch = await PasswordCrypto.verifyPassword(
            password,
            user.password
        );
        if (!passwordMatch) {
            return sendErrorResponse(
                res,
                StatusCodes.UNAUTHORIZED,
                TLoginError(LoginErrors.InvalidEmailOrPassword)
            );
        }
        const accessToken = JWTService.sign({
            uid: user.id,
            roles: user.roles
        });
        if (accessToken === EJWTErrors.SECRET_NOT_FOUND) {
            return sendErrorResponse(
                res,
                StatusCodes.UNAUTHORIZED,
                accessToken
            );
        }
        sendSuccessResponse(res, StatusCodes.OK, {
            accessToken,
            user: {
                id: user.id,
                userName: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                roles: user.roles,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } catch (error: any) {
        console.error(error);
        switch (error.message) {
            case SQLErrors.GENERIC_DB_ERROR:
                return sendErrorResponse(
                    res,
                    StatusCodes.BAD_GATEWAY,
                    TGenericError(GenericErrors.DatabaseConnectionError)
                );
            case SQLErrors.NOT_FOUND_REGISTER:
                return sendErrorResponse(
                    res,
                    StatusCodes.UNAUTHORIZED,
                    TLoginError(LoginErrors.InvalidEmailOrPassword)
                );
            default:
                return sendErrorResponse(
                    res,
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    error.message
                );
        }
    }
};
