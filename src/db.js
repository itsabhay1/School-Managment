import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({
    path: `./.env`
});

let db;

try {
    db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    console.log('Connected to the database');
} catch (error) {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1);
}

export default db;