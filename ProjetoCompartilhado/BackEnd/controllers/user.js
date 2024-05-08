import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM endereco";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO endereco(`bairro`, `tipo`, `endereco`, `coordenada`) VALUES(?)";

  const values = [
    req.body.bairro,
    req.body.tipo,
    req.body.endereco,
    req.body.coordenada,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Moradia criada com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE endereco SET `bairro` = ?, `tipo` = ?, `endereco` = ?, `coordenada` = ? WHERE `idpredio` = ?";

  const values = [
    req.body.bairro,
    req.body.tipo,
    req.body.endereco,
    req.body.coordenada,
  ];

  db.query(q, [...values, req.params.idpredio], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Moradia atualizada com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM endereco WHERE `idpredio` = ?";

  db.query(q, [req.params.idpredio], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Moradia deletada com sucesso.");
  });
};
