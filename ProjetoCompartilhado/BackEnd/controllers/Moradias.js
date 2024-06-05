import { db } from "../db.js";

export const getLocations = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const offset = (page - 1) * limit;

  db.query(
    'SELECT * FROM endereco ORDER BY bairro LIMIT ? OFFSET ?',
    [parseInt(limit), parseInt(offset)],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      db.query('SELECT COUNT(*) AS count FROM endereco', (error, total) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.json({
          data: results,
          total: total[0].count,
          page: parseInt(page),
          limit: parseInt(limit),
        });
      });
    }
  );
};


export const addLocations = (req, res) => {
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

export const updateLocations = (req, res) => {
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

export const deleteLocations = (req, res) => {
  const q = "DELETE FROM endereco WHERE `idpredio` = ?";

  db.query(q, [req.params.idpredio], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Moradia deletada com sucesso.");
  });
};

export const getCoordinates = (req, res) => {
  const query = 'SELECT coordenada, tipo, endereco FROM endereco';
  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    try {
      const coordinates = results.map(row => {
        let coordsString = row.coordenada;
        if (coordsString && coordsString.startsWith('[') && coordsString.endsWith(']')) {
          try {
            const coords = JSON.parse(coordsString);
            if (Array.isArray(coords) && coords.length === 2 && 
                typeof coords[0] === 'number' && typeof coords[1] === 'number') {
              return {
                coords,
                tipo: row.tipo,
                endereco: row.endereco
              };
            }
          } catch (parseError) {
            console.error('Erro ao fazer parse das coordenadas:', parseError);
            return null;
          }
        }
        return null;
      }).filter(coords => coords !== null);
      res.json(coordinates);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao processar as coordenadas' });
    }
  });
};