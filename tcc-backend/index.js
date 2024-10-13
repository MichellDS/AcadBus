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

app.get('/pessoa', (req, res) => {
    const query = 'SELECT * FROM pessoa';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar pessoas:', err);
            return res.status(500).json({ error: 'Erro ao buscar pessoas' });
        }
        res.json(results);
    });
});

app.get('/motorista', (req, res) => {
    const query = `
        SELECT m.ID, m.UsuarioID, m.CPF, m.Codigo, p.Nome, p.Sexo, p.DataNascimento, p.Telefone, p.Email
        FROM motorista m
        INNER JOIN pessoa p ON m.UsuarioID = p.ID
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar motoristas:', err);
            return res.status(500).json({ error: 'Erro ao buscar motoristas' });
        }
        res.json(results);
    });
});

app.get('/estudante', (req, res) => {
    const query = `
        SELECT e.ID, e.UsuarioID, e.NecessidadesEspeciais, e.Embarque, e.Desembarque, e.CampusDestino, e.ContatoEmergencial, p.Nome, p.Sexo, p.DataNascimento, p.Telefone, p.Email
        FROM estudante e
        INNER JOIN pessoa p ON e.UsuarioID = p.ID
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar estudantes:', err);
            return res.status(500).json({ error: 'Erro ao buscar estudantes' });
        }
        res.json(results);
    });
});

app.get('/chats', (req, res) => {
    const query = `
        SELECT c.ID, c.Nome, c.Descricao, c.MotoristaID, c.DataCriacao, p.Nome AS MotoristaNome
        FROM chats c
        INNER JOIN motorista m ON c.MotoristaID = m.ID
        INNER JOIN pessoa p ON m.UsuarioID = p.ID
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar b:', err);
            return res.status(500).json({ error: 'Erro ao buscar chats' });
        }
        res.json(results);
    });
});

app.get('/mensagens', (req, res) => {
    const query = `
        SELECT m.ID, m.ChatID, m.UsuarioID, m.Conteudo, m.DataEnvio, p.Nome AS UsuarioNome, p.Tipo AS UsuarioTipo
        FROM mensagens m
        INNER JOIN pessoa p ON m.UsuarioID = p.ID
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar mensagens:', err);
            return res.status(500).json({ error: 'Erro ao buscar mensagens' });
        }
        res.json(results);
    });
});

app.post('/api/login/motorista', async (req, res) => {
    const { codigo, senha } = req.body;

    console.log('Recebendo requisição de login:', req.body);

    const query = `
    SELECT p.Nome, m.Codigo, m.UsuarioID
    FROM motorista m
    INNER JOIN pessoa p ON m.UsuarioID = p.ID
    WHERE m.Codigo = ? AND m.Senha = ?
`;
    console.log('Código e senha recebidos:', codigo, senha);
    db.query(query, [codigo, senha], (err, results) => {
        if (err) {
            console.error('Erro ao fazer login:', err);
            return res.status(500).json({ error: 'Erro ao fazer login' });
        }
        if (results.length > 0) {
            return res.json({ type: 'motorista', nome: results[0].Nome, usuarioId: results[0].UsuarioID });
        } else {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
    });
});

app.post('/api/login/estudante', async (req, res) => {
    const { email, senha } = req.body;

    console.log('Recebendo requisição de login:', req.body);

    const query = `
    SELECT p.Nome, p.Email, e.UsuarioID
    FROM estudante e
    INNER JOIN pessoa p ON e.UsuarioID = p.ID
    WHERE p.Email = ? AND e.Senha = ?
`;
    console.log('Email e senha recebidos:', email, senha);
    db.query(query, [email, senha], (err, results) => {
        if (err) {
            console.error('Erro ao fazer login:', err);
            return res.status(500).json({ error: 'Erro ao fazer login' });
        }
        if (results.length > 0) {
            return res.json({ type: 'passageiro', nome: results[0].Nome, usuarioId: results[0].UsuarioID });
        } else {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
    });
});

app.post('/api/mensagens', (req, res) => {
    const { chatID, UsuarioID, Conteudo } = req.body;

    const query = `
        INSERT INTO mensagens (ChatID, UsuarioID, Conteudo, DataEnvio)
        VALUES (?, ?, ?, NOW())
    `;

    db.query(query, [chatID, UsuarioID, Conteudo], (err, results) => {
        if (err) {
            console.error('Erro ao enviar mensagem:', err);
            return res.status(500).json({ error: 'Erro ao enviar mensagem' });
        }
        res.status(201).json({ message: 'Mensagem enviada com sucesso', id: results.insertId });
    });
});


app.put('/api/mensagens/:id', (req, res) => {
    const { id } = req.params;
    const { conteudo } = req.body;

    const query = `
        UPDATE mensagens
        SET Conteudo = ?
        WHERE ID = ?
    `;

    db.query(query, [conteudo, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar mensagem:', err);
            return res.status(500).json({ error: 'Erro ao atualizar mensagem' });
        }
        res.json({ message: 'Mensagem atualizada com sucesso' });
    });
});




const PORT = 9221;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});




