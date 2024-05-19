import mysql from "mysql2";

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,      
    database: process.env.DATABASE, 
    port: 16168,
    connectionLimit: 10 
});

// Agora você pode executar consultas usando o pool
export const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query(sql, values, (err, results) => {
        connection.release(); // Libera a conexão de volta para o pool
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  });
};