import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { SuccessListResponse } from './types';

const resolveItemsPerPage = (
    itemsPerPage: number | undefined,
    totalItems: number | undefined
): number | undefined => {
    if (totalItems !== undefined && totalItems < 10) {
        return totalItems;
    }
    return itemsPerPage;
};

export const sendSuccessResponse = (
    res: Response,
    statusCode: StatusCodes,
    results: unknown,
    totalItems?: number,
    page?: number,
    itemsPerPage?: number
): void => {
    let response: SuccessListResponse = {
        success: true,
        results: results
    };

    if (
        totalItems !== undefined &&
        itemsPerPage !== undefined &&
        page !== undefined
    ) {
        response = {
            ...response,
            totalItems: Number(totalItems),
            itemsPerPage: Number(resolveItemsPerPage(itemsPerPage, totalItems)),
            totalPages: Number(Math.ceil(totalItems / itemsPerPage)),
            page: Number(page)
        };
    } else if (typeof results === 'string') {
        response = {
            success: true,
            results: { message: results }
        };
    }

    res.status(statusCode).json(response);
};
