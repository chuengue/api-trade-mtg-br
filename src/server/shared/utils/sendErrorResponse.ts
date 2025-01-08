import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const sendErrorResponse = (
    res: Response,
    statusCode: StatusCodes,
    error: unknown
) => {
    return res.status(statusCode).json({
        success: false,
        error
    });
};
