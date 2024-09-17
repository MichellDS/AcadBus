const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '*****',
    database: 'acadbus',
    port: 3306
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

app.get('/chats', (req, res) => {
    const query = 'SELECT * FROM chats'; //update e insert e delete
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar chats:', err);
            return res.status(500).json({ error: 'Erro ao buscar chats' });
        }
        res.json(results);
    });
});















const PORT = 9221;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});




