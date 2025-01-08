import { ETableNames } from '../../../database/ETableNames';
import { Knex } from '../../../database/knex';
import { IFindExistingItemsProps } from './types';

export const findExistingItemOrNotInCollection = async ({
    userId,
    collectionId,
    listCardsId
}: IFindExistingItemsProps): Promise<
    | {
          existingItems: string[];
          nonExistingItems: string[];
      }
    | Error
> => {
    try {
        const existingItems = await Knex.transaction(async trx => {
            const columns = ['cardId'];

            const items = await trx(ETableNames.collectionsItems)
                .select(columns)
                .whereIn('cardId', listCardsId)
                .andWhere({ userId, collectionId });

            return items;
        });

        const existingIds = existingItems.map(card => card.cardId);
        const nonExistingIds = listCardsId.filter(
            id => !existingIds.includes(id)
        );
        return {
            existingItems: existingIds,
            nonExistingItems: nonExistingIds
        };
    } catch (error) {
        console.error(error);
        return new Error();
    }
};
