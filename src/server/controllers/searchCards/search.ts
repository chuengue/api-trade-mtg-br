import { Request, Response } from 'express';

import {
    apiType,
    getPublicCollections
} from '../../services/requests/searchCard';

interface ISearchCard {
    cardName: string;
}
export const fetchCardCollections = (api: apiType) => {
    return async (req: Request<{}, {}, ISearchCard>, res: Response) => {
        try {
            const { cardName } = req.body;

            if (!cardName) {
                return res
                    .status(400)
                    .json({ error: 'O nome da carta é obrigatório.' });
            }

            const data = await getPublicCollections(api, { cardName });

            if (!data) {
                return res.status(404).send('Not Found');
            }

            return res.status(200).json(data);
        } catch (error) {
            console.error('Erro ao buscar coleções públicas:', error);
            return res
                .status(500)
                .json({ error: 'Erro ao processar a requisição.' });
        }
    };
};
