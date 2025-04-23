import express from "express";
import dotenv from "dotenv";
import db from "./db.js";

dotenv.config();
const app = express();
app.use(express.json());

db.query('SELECT 1')
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`server is running at port : ${process.env.PORT}`);
    });
})
.catch(err => {
    console.error('Failed to start sever: database not reachable');
    console.error(err.message);
    process.exit(1);
})
