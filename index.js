import cors from "cors";
import express from "express";
import connection from './db.js';
import aplicarRegra from './regras.js';

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    console.log('Rodando na porta 3000')
  });

app.get('/liga', (req, res) => {
    connection.query('SELECT * FROM Resultados', (error, results, fields) => {
        if (error) {
          return res.status(500).send('Erro ao executar a consulta: ' + error.stack);
        }
        res.json(aplicarRegra(results)); 
      });
});

app.listen(port, () => {
    console.log('Rodando na porta 3000')
})