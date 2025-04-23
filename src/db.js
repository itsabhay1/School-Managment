import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({
    path: `./.env`
});

let db;

const connectToDatabase = async () => {
    try {
        db = await mysql.createConnection(process.env.MYSQL_URL);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
        process.exit(1);
    }
};

await connectToDatabase();

export default db;