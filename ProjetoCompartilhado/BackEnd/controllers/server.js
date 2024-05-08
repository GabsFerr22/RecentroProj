import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import mysql from "mysql";
import cors from "cors"

const app = express();
app.use(express.json())
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'loginadm'
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
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const postUsers = (req, res) => {
  const { cpf, senha } = req.body;

  db.query('SELECT * FROM admins WHERE cpf = ? AND senhaAdmin = ?', [cpf, senha], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro interno no servidor' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'CPF ou senha inválidos' });
      return;
    }

    const token = jwt.sign({ cpf }, 'A7$h3jk#sG9!2@lD$^2k$CmP5hQnEtYlT*H9');
    res.json({ token });
  });
};



