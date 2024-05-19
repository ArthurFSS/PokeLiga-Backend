import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

app.get('/', (req, res) => 
{
    res.send('Teste liga')
});

function createData(posicao, nome, pontuacao) {
    return {
      posicao,
      nome,
      pontuacao,
      history: [
        { data: '2020-01-05', pontuacao: '12' },
        { data: '2020-01-05', pontuacao: '16' },
        { data: '2020-01-05', pontuacao: '17' },
        { data: '2020-01-05', pontuacao: '18' },
        { data: '2020-01-05', pontuacao: '16' },
      ],
    };
  };

app.get('/liga', (req, res) => {
const rows = [
        createData(1, 'Arthur', 60),
        createData(2, 'Dylan', 59),
        createData(3, 'Gabriel', 55),
        createData(4, 'Rica', 40),
        createData(5, 'RenêRoots', 3),
      ];

res.send(rows)});

app.listen(port, () => {
    console.log('Rodando na porta 3000')
})