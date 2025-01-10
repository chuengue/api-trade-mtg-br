import { SQLErrors } from '../../../shared';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { Card } from '../../models/cards';
import { ISearchCardProps } from '../types';
import { count } from './Count';

export const searchCardProvider = async ({
    name = '',
    page,
    limit
}: ISearchCardProps): Promise<
    { total_cards: number; has_more: boolean; data: Card[] } | Error
> => {
    try {
        if (!name.trim()) {
            return new Error(SQLErrors.NOT_FOUND_REGISTER);
        }

        const normalizedCardName = name.replace(',', '').trim();
        const parts = normalizedCardName.split(/\s+/);

        const query = Knex(ETableNames.cards)
            .select('*')
            .where(builder => {
                parts.forEach(part => {
                    builder.andWhere('name', 'like', `%${part}%`);
                });
            })
            .offset((page - 1) * limit)
            .limit(limit);

        const result = await query;

        if (result.length > 0) {
            const totalCards = await count(name);
            return {
                total_cards: totalCards,
                has_more: totalCards > page * limit,
                data: result
            };
        }

        return new Error(SQLErrors.NOT_FOUND_REGISTER);
    } catch (error) {
        console.error('Erro na busca de cartas:', error);
        return new Error(SQLErrors.NOT_FOUND_REGISTER);
    }
};
