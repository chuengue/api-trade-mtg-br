export interface Image_uris {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
}
export interface CardFace {
    object: string;
    name: string;
    mana_cost: string;
    type_line: string;
    oracle_text: string;
    colors: string[];
    flavor_text?: string; // Campo opcional
    watermark?: string; // Campo opcional
    artist: string;
    artist_id: string;
    illustration_id: string;
    image_uris: Image_uris;
}
export interface AllParts {
    object: string;
    id: string;
    component: string;
    name: string;
    type_line: string;
    uri: string;
}
export interface Card {
    id: string;
    oracle_id: string;
    name: string;
    lang: string;
    released_at: string;
    layout: string;
    highres_image: boolean;
    mana_cost: string;
    cmc: number;
    produced_mana?: string;
    type_line: string;
    oracle_text: string;
    foil: boolean;
    nonfoil: boolean;
    power: string;
    toughness: string;
    rarity: string;
    set_id: string;
    set: string;
    rulings_uri: string;
    frame: string;
    set_name: string;
    collector_number: string;
    colors: string[];
    color_identity: string[];
    keywords: string[];
    all_parts: AllParts[];
    edhrec_rank: string;
    artist: string;
    prices: {
        usd: string;
        usd_foil: string;
    };
    image_uris: Image_uris;
    legalities: Record<string, string>;
    multiverse_ids: number[];
    mtgo_id: number;
    arena_id: number;
    tcgplayer_id: number;
    cardmarket_id: number;
    card_faces: CardFace[];
}
export interface IcardResponse {
    total_cards: number;
    has_more: boolean;
    data: Card[];
}
