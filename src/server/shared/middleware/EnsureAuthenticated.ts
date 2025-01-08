import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { GenericErrors, LoginErrors } from '../enum';
import { JWTService } from '../services';
import { EJWTErrors } from '../services/JWTService/types';
import { getErrorMessage, sendErrorResponse } from '../utils';

const TLoginError = getErrorMessage('Errors.loginErrors');

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return sendErrorResponse(
            res,
            StatusCodes.UNAUTHORIZED,
            TLoginError(LoginErrors.UserNotAuthenticated)
        );
    }
    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
        return sendErrorResponse(
            res,
            StatusCodes.UNAUTHORIZED,
            TLoginError(GenericErrors.InvalidAccessToken)
        );
    }
    const jwtData = JWTService.verify(token);

    if (jwtData === EJWTErrors.SECRET_NOT_FOUND) {
        return sendErrorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            TLoginError(LoginErrors.VerifyErrorToken)
        );
    } else if (jwtData === EJWTErrors.INVALID_TOKEN) {
        return sendErrorResponse(
            res,
            StatusCodes.UNAUTHORIZED,
            TLoginError(LoginErrors.UserNotAuthenticated)
        );
    }
    req.headers.userId = jwtData.uid.toString();
    req.headers.roles = jwtData.roles;
    return next();
};
