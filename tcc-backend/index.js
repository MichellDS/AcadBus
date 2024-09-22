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
    password: 'titan',
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
    const query = 'SELECT * FROM chats';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar chats:', err);
            return res.status(500).json({ error: 'Erro ao buscar chats' });
        }
        res.json(results);
    });
});

app.get('/motorista', (req, res) => {
    const query = 'SELECT * FROM motorista';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar motoristas:', err);
            return res.status(500).json({ error: 'Erro ao buscar motoristas' });
        }
        res.json(results);
    });
});

app.get('/estudante', (req, res) => {
    const query = 'SELECT * FROM estudante';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar estudantes:', err);
            return res.status(500).json({ error: 'Erro ao buscar estudantes' });
        }
        res.json(results);
    });
});

app.get('/mensagens', (req, res) => {
    const query = 'SELECT * FROM mensagens';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar mensagens:', err);
            return res.status(500).json({ error: 'Erro ao buscar mensagens' });
        }
        res.json(results);
    });
});

// Endpoint para buscar participantes
app.get('/participantes', (req, res) => {
    const query = 'SELECT * FROM participantes';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar participantes:', err);
            return res.status(500).json({ error: 'Erro ao buscar participantes' });
        }
        res.json(results);
    });
});












const PORT = 9221;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});




