const express = require('express')
const app = express();

app.use(express.json());

const port = process.env.PORT || 3001;

app.get('/', (req, res) => 
{
    res.send('Teste liga')
});

app.listen(3000, () => {
    console.log('Rodando na porta 3000')
})