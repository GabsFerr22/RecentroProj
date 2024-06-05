import jwt from "jsonwebtoken";
import mysql from "mysql";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA2,
  multipleStatements: true
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

export const getUsers = (_, res) => {
  const q = "SELECT * FROM admins";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar usuários' });

    return res.status(200).json(data);
  });
};

export const postUsers = (req, res) => {
  const { cpf, senha } = req.body;

  db.query('SELECT * FROM admins WHERE cpf = ? AND senhaAdmin = ?', [cpf, senha], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'CPF ou senha inválidos' });
    }

    const admin = results[0];
    const payload = {
      uuid: uuidv4(),
      userId: admin.id,
      cpf: admin.cpf
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};
