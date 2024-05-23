// processarResultados.js

import { query } from './db.js';

async function processarLiga(data, ligaId) {
    try {
        // Processar os resultados das partidas para a data e liga especificadas
        const partidas = await query(`
            SELECT p.*, pl1.firstname AS player1_firstname, pl1.lastname AS player1_lastname,
            pl2.firstname AS player2_firstname, pl2.lastname AS player2_lastname
            FROM partidas p
            INNER JOIN players pl1 ON p.player1 = pl1.userid
            INNER JOIN players pl2 ON p.player2 = pl2.userid
            WHERE p.data = '${data}' AND p.liga = ${ligaId}
        `);

        // Inicializar um objeto para armazenar os resultados dos jogadores
        const resultados = {};

        // Iterar sobre as partidas e atualizar os resultados dos jogadores
        for (const partida of partidas) {
            const { player1, player2, outcome, player1_firstname, player1_lastname, player2_firstname, player2_lastname } = partida;

            // Atualizar resultados para player1
            if (!resultados[player1]) {
                resultados[player1] = {
                    nome: `${player1_firstname} ${player1_lastname}`,
                    pontos: 0,
                    liga: ligaId
                };
            }
            if (outcome === 1) {
                resultados[player1].pontos += 3; // Vitória
            } else if (outcome === 3) {
                resultados[player1].pontos += 1; // Empate
            }

            // Atualizar resultados para player2
            if (!resultados[player2]) {
                resultados[player2] = {
                    nome: `${player2_firstname} ${player2_lastname}`,
                    pontos: 0,
                    liga: ligaId
                };
            }
            if (outcome === 2) {
                resultados[player2].pontos += 3; // Vitória
            } else if (outcome === 3) {
                resultados[player2].pontos += 1; // Empate
            }
        }

        //Pontos por participação;
        for (const jogador in resultados) {
            resultados[jogador].pontos += 3;
        }

        const resultadosArray = Object.values(resultados);

        // Construir a consulta de inserção
        const valores = resultadosArray.map(({ nome, pontos, liga }) => `('${nome}', ${pontos}, '${liga}', '${data}')`).join(', ');
        
        const queryStr = `
            INSERT INTO resultados (nome, pontos, liga, data) 
            VALUES ${valores}
        `;

        console.log(queryStr)
        
        await query(queryStr);
        



        return { message: 'Resultados processados e inseridos com sucesso.' };
    } catch (error) {
        console.error('Erro ao processar resultados:', error);
        throw new Error('Erro ao processar resultados.');
    }
}

export default processarLiga;