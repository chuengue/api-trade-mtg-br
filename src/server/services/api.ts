import axios from 'axios';

export const BASE_URL = 'https://api.scryfall.com';
export const apiStart = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});
