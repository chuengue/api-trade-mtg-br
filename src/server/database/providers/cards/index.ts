import * as count from './Count';
import * as searchCardProvider from './search';

export const CardsProviders = {
    ...searchCardProvider,
    ...count
};
