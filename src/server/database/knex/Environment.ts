import { Knex } from 'knex';
import path from 'path';

const env = process.env.NODE_ENV || 'dev';

console.log(`Environment: ${env}`);

const baseConfig: Knex.Config = {
    client: process.env[`DATABASE_${env}_CLIENT`],
    connection: {
        host: process.env[`DATABASE_${env}_HOST`],
        user: process.env[`DATABASE_${env}_USERNAME`],
        password: process.env[`DATABASE_${env}_PASSWORD`],
        port: parseInt(process.env[`DATABASE_${env}_PORT`] || '3306', 10),
        database: process.env[`DATABASE_${env}_NAME`]
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds')
    }
};

export default baseConfig;
