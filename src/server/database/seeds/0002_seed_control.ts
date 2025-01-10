import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Verifica se a tabela seeds_control já possui um registro
    const seedsControl = await knex('seeds_control')
        .select('seeds_run')
        .first();

    // Se não houver nenhum registro na tabela, insere o valor `seeds_run: true`
    if (!seedsControl) {
        console.log('Inserindo controle de seeds na tabela seeds_control...');
        await knex('seeds_control').insert({ seeds_run: true });
        console.log('Controle de seeds inserido.');
    } else {
        console.log(
            'Controle de seeds já existe, sem necessidade de inserção.'
        );
    }
}
