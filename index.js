import cors from "cors";
import express from "express";

const express = require('express')
const app = express();


app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

app.get('/', (req, res) => 
{
    res.send('Teste liga')
});

app.get('/liga', (req, res) => 
    {
        res.send('pegando os dados da liga')
    });

app.listen(port, () => {
    console.log('Rodando na porta 3000')
})