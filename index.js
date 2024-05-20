import cors from "cors";
import express from "express";
import {query} from './db.js';
import aplicarRegra from './regras.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    console.log('Rodando na porta 3000')
  });
  
app.get('/liga', async (req, res) => {
    res.json(aplicarRegra(await query('SELECT * FROM Resultados'))); 
});

app.get('/ligas', async (req, res) => {
    res.json(await query('SELECT * FROM ligas order by DataFim desc')); 
});

app.listen(port, () => {
    console.log('Rodando na porta 3000')
})