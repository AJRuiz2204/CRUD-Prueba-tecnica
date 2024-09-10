import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'contra',
    database: 'CRUD'
})

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM students';
    db.query(sql, (err, result) => {
        if (err)
            return res.json({Message: "Error inside server"})
        else res.json(result);
    })
})

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});