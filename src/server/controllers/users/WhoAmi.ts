import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { UsersProviders } from '../../database/providers/user';
import { sendErrorResponse } from '../../shared';
import { sendSuccessResponse } from '../../shared/utils/SendSuccessResponse';

export const whoami: RequestHandler = async (req, res) => {
    const userId = req.headers.userId as string;
    try {
        const user = await UsersProviders.getUser({ id: userId });
        sendSuccessResponse(res, StatusCodes.OK, {
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
        console.log(error);
        sendErrorResponse(res, StatusCodes.BAD_REQUEST, error.message);
    }
};
