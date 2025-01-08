import { knex } from 'knex';
import baseConfig from './Environment';

export const Knex = knex(baseConfig);
