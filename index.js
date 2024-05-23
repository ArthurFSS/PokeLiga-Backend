import cors from "cors";
import express from "express";
import { query } from './db.js';
import aplicarRegra from './regras.js';
import dotenv from 'dotenv';
import processarLiga from './processarResultados.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    console.log('Api funcionando');
});

app.get('/liga/:id', async (req, res) => {
    const id = req.params.id;
    res.json(aplicarRegra(await query(`SELECT * FROM Resultados WHERE liga = ${id}`))); 
});

app.get('/ligas', async (req, res) => {
    res.json(await query('SELECT * FROM ligas ORDER BY DataFim DESC')); 
});


app.post('/partidas', async (req, res) => {
    const partidas = req.body;

    if (!Array.isArray(partidas)) {
        return res.status(400).json({ error: 'O corpo da requisição deve ser uma lista de partidas' });
    }

    try {
        const values = partidas.map(({ roundNumber, player1, player2, outcome, data, liga }) => 
            `(${roundNumber}, '${player1}', '${player2}', ${outcome}, '${data}', ${liga})`
        ).join(', ');

        const queryStr = `
            INSERT INTO partidas (roundNumber, player1, player2, outcome, data, liga)
            VALUES ${values}
        `;

        await query(queryStr);

        res.status(201).json({ message: 'Partidas inseridas com sucesso' });
    } catch (error) {
        console.error('Erro ao inserir partidas:', error);
        res.status(500).json({ error: 'Erro ao inserir partidas' });
    }
});

app.post('/players', async (req, res) => {
    const players = req.body;

    if (!Array.isArray(players)) {
        return res.status(400).send('A lista de jogadores é necessária.');
    }

    try {
        for (const player of players) {
            const { userid, firstname, lastname, birthdate } = player;

            const existingPlayer = await query(`SELECT * FROM players WHERE userid = ${userid}`, [userid]);
            console.log(existingPlayer.length)
            if (existingPlayer.length === 0) {
                console.log(`INSERT INTO players (userid, firstname, lastname, birthdate) VALUES (${userid}, '${firstname}', '${lastname}', '${birthdate}')`)
                
                await query(
                    `INSERT INTO players (userid, firstname, lastname, birthdate) VALUES (${userid}, '${firstname}', '${lastname}', '${birthdate}')`
                );
            }
        }

        res.status(200).send('Jogadores inseridos/atualizados com sucesso.');
    } catch (error) {
        console.error('Erro ao inserir/atualizar jogadores:', error);
        res.status(500).send('Erro ao inserir/atualizar jogadores.');
    }
});

app.get('/processar-liga/:data/:ligaId', async (req, res) => {
    const { data, ligaId } = req.params;
    try {
        const result = await processarLiga(data, ligaId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});
