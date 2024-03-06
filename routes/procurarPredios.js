// routes/procurarPredios.js

const express = require('express');
const router = express.Router();
const connection = require('../config/database'); // Arquivo de configuração da conexão com o MySQL

// Rota para procurar prédios
router.get('/', (req, res) => {
  const nome = req.query.nome;
  const query = `SELECT * FROM predios WHERE nome = ?`;
  
  connection.query(query, [nome], (err, result) => {
    if (err) {
      console.error('Erro ao procurar prédios:', err);
      res.status(500).json({ sucesso: false, mensagem: 'Erro ao procurar prédios' });
      return;
    }
    res.json({ sucesso: true, predios: result });
  });
});

module.exports = router;
