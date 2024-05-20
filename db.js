import pkg from 'pg';
const { Client } = pkg;

// Database connection configuration
const dbConfig = {
    user: "postgres",
    host: "reverently-exultant-dunlin.data-1.use1.tembo.io",
    database: "pokeliga",
    password: "ttnK072q3d6gYMk0",
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
};

// user: process.env.USER,
// host: process.env.HOST,
// database: process.env.DATABASE,
// password: process.env.PASSWORD,
// Create a new PostgreSQL client
const client = new Client(dbConfig);

// Connect to the database
export const query = async (query) => {
  let result;
    try {
        await client.connect();
        console.log('Connected to PostgreSQL database');

        // Execute SQL queries here
        result = await client.query(query);

        // Close the connection when done
        await client.end();
        console.log('Connection to PostgreSQL closed');
        return result.rows;
    } catch (err) {
        console.error('Error connecting to PostgreSQL database', err);
    }
};