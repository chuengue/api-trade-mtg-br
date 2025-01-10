import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const count = async (name: string): Promise<number> => {
    try {
        let query = Knex(ETableNames.cards).count('* as count');

        if (name) {
            const normalizedCardName = name.replace(',', '').trim();
            const parts = normalizedCardName.split(/\s+/);

            parts.forEach(part => {
                query = query.where('name', 'like', `%${part}%`);
            });
        }

        const result = await query;

        const count = result[0]?.count;
        if (count == null || isNaN(Number(count))) {
            throw new Error(
                'Erro ao consultar a quantidade total de registros'
            );
        }

        return Number(count);
    } catch (error) {
        console.error(
            'Erro ao consultar a quantidade total de registros:',
            error
        );
        throw new Error('Erro ao consultar a quantidade total de registros');
    }
};
