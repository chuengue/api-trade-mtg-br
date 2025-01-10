import 'dotenv/config';
import { Knex } from './server/database/knex';
import { server } from './server/Server';



const startServer = () => {
    server.listen(process.env.PORT || 3333, () => {
        console.log(`App is Running on PORT ${process.env.PORT || 3333}`);
    });
};
if (process.env.IS_LOCALHOST !== 'TRUE') {
    console.log('Iniciando migrações...');
    
    Knex.migrate
        .latest()
        .then(async () => {
            console.log('Migrações concluídas.');

            // Verificar se a tabela de controle de seeds existe, e se não, criar
            const tableExists = await Knex.schema.hasTable('seeds_control');
            if (!tableExists) {
                console.log('Tabela "seeds_control" não existe. Criando...');
                await Knex.schema.createTable('seeds_control', (table) => {
                    table.boolean('seeds_run').defaultTo(false);
                    table.timestamps(true, true);
                });
                console.log('Tabela "seeds_control" criada.');
            }

            // Verificar se os seeds já foram executados
            const seedsExist = await Knex('seeds_control').select('seeds_run').first();
            if (!seedsExist || seedsExist.seeds_run === false) {
                console.log('Iniciando execução dos seeds...');
                await Knex.seed.run();
                console.log('Seeds concluídos.');
                
                // Registrar que os seeds foram executados
                await Knex('seeds_control').insert({ seeds_run: true });
            } else {
                console.log('Seeds já foram executados anteriormente.');
            }

            console.log('Iniciando o servidor...');
            startServer();
        })
        .catch((err) => {
            console.error('Erro durante migrações:', err.message || err);
            process.exit(1);
        });
} else {
    console.log('Executando como localhost, iniciando o servidor...');
    startServer();
}