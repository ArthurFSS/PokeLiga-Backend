import mysql from "mysql2"

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,      
  database: process.env.DATABASE, 
  port: 16168 
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados com sucesso. ID da conexão: ' + connection.threadId);
});

export default connection;