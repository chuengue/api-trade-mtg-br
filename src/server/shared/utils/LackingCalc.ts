export const lackingCalc = (collection: string[], allCard: string[]) => {
    return allCard.filter(card => !collection.includes(card));
};
