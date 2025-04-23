import express from "express";
import dotenv from "dotenv";
import db from "./db.js";
import schoolRouter from "../Routes/school.router.js";

dotenv.config();
const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to the School API');
});


app.use('/api', schoolRouter);

db.query('SELECT 1')
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`server is running at port : ${process.env.PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to start server: database not reachable');
        console.error(err.message);
        process.exit(1);
    })
