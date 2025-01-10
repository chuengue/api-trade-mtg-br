import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { searchCardProvider } from '../../database/providers/cards/search';
import { getErrorMessage, sendErrorResponse } from '../../shared';

const TGenericError = getErrorMessage('Errors.cardsErrors');

export const fetchCardCollections = () => {
    return async (req: Request, res: Response) => {
        try {
            const cardName = req.query['q'] as string | undefined;
            const page = parseInt(req.query['page'] as string) || 1;
            const limit = parseInt(req.query['limit'] as string) || 50;

            if (!cardName || typeof cardName !== 'string' || !cardName.trim()) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    error: 'O nome da carta é obrigatório e deve ser uma string válida.'
                });
            }

            if (page <= 0 || limit <= 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    error: 'Os parâmetros "page" e "limit" devem ser números positivos.'
                });
            }

            const data = await searchCardProvider({
                name: cardName.trim(),
                page,
                limit
            });

            if (data instanceof Error) {
                return sendErrorResponse(
                    res,
                    StatusCodes.NOT_FOUND,
                    TGenericError(2001)
                );
            }

            // Retornar dados com sucesso
            return res.status(StatusCodes.OK).json(data);
        } catch (error) {
            console.error('Erro ao buscar cartas:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'Erro ao processar a requisição. Tente novamente mais tarde.'
            });
        }
    };
};
