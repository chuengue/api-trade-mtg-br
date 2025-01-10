import fs from 'fs';
import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';
import { Card } from '../models/cards';

export const seed = async (knex: Knex): Promise<void> => {
    const rawData = fs.readFileSync(
        '/bulk_data/default-cards-20250109100816.json'
    );
    const cards: Card[] = JSON.parse(rawData.toString());

    try {
        await knex.transaction(async trx => {
            for (const card of cards) {
                const existingCard = await trx('cards')
                    .where({ id: card.id })
                    .first();
                if (!existingCard) {
                    await trx('cards').insert({
                        id: card.id,
                        oracle_id: card.oracle_id,
                        name: card.name,
                        lang: card.lang,
                        released_at: card.released_at,
                        layout: card.layout,
                        highres_image: card.highres_image,
                        mana_cost: card.mana_cost,
                        cmc: card.cmc,
                        type_line: card.type_line,
                        foil: card.foil,
                        nonfoil: card.nonfoil,
                        rulings_uri: card.rulings_uri,
                        edhrec_rank: card.edhrec_rank,
                        color_identity: JSON.stringify(card.color_identity),
                        keywords: JSON.stringify(card.keywords),
                        oracle_text: card.oracle_text,
                        power: card.power,
                        frame: card.frame,
                        toughness: card.toughness,
                        rarity: card.rarity,
                        set_id: card.set_id,
                        set: card.set,
                        set_name: card.set_name,
                        collector_number: card.collector_number,
                        artist: card.artist,
                        created_at: new Date(),
                        updated_at: new Date()
                    });
                    console.log(card.id + ' ' + 'Inserted');
                }

                if (card.card_faces) {
                    for (const face of card.card_faces) {
                        await trx(ETableNames.cardFace).insert({
                            card_id: card.id,
                            name: face.name,
                            mana_cost: face.mana_cost,
                            type_line: face.type_line,
                            oracle_text: face.oracle_text,
                            colors: JSON.stringify(face.colors),
                            flavor_text: face.flavor_text,
                            artist: face.artist
                        });
                    }
                }

                // Identifiers
                const identifiers = [
                    {
                        card_id: card.id,
                        identifier_name: 'multiverse_id',
                        identifier_value: card.multiverse_ids[0]
                    },
                    {
                        card_id: card.id,
                        identifier_name: 'mtgo_id',
                        identifier_value: card.mtgo_id
                    },
                    {
                        card_id: card.id,
                        identifier_name: 'arena_id',
                        identifier_value: card.arena_id
                    },
                    {
                        card_id: card.id,
                        identifier_name: 'tcgplayer_id',
                        identifier_value: card.tcgplayer_id
                    },
                    {
                        card_id: card.id,
                        identifier_name: 'cardmarket_id',
                        identifier_value: card.cardmarket_id
                    }
                ].filter(id => id.identifier_value);

                if (identifiers.length > 0) {
                    await trx('identifiers').insert(identifiers);
                }

                // Prices
                const prices = [];
                if (card.prices.usd) {
                    prices.push({
                        card_id: card.id,
                        currency: 'USD',
                        price: card.prices.usd,
                        foil: false
                    });
                }
                if (card.prices.usd_foil) {
                    prices.push({
                        card_id: card.id,
                        currency: 'USD',
                        price: card.prices.usd_foil,
                        foil: true
                    });
                }
                if (prices.length > 0) {
                    await trx('prices').insert(prices);
                }

                // Legalities
                const legalities = Object.entries(card.legalities).map(
                    ([format, status]) => ({
                        card_id: card.id,
                        format,
                        status
                    })
                );
                await trx('legalities').insert(legalities);

                // Images
                if (card.card_faces) {
                    for (const face of card.card_faces) {
                        if (face.image_uris) {
                            const images = Object.entries(face.image_uris).map(
                                ([type, url]) => ({
                                    card_id: card.id,
                                    image_type: type,
                                    url
                                })
                            );
                            await trx('images').insert(images);
                        }
                    }
                } else if (card.image_uris) {
                    const images = Object.entries(card.image_uris).map(
                        ([type, url]) => ({
                            card_id: card.id,
                            image_type: type,
                            url
                        })
                    );
                    await trx('images').insert(images);
                }
            }
        });

        console.log('Seed executado com sucesso!');
    } catch (error) {
        console.error('Erro ao executar o seed:', error);
    }
};
