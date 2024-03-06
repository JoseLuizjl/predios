// routes/cadastrarPredio.js

const express = require('express');
const router = express.Router();
const connection = require('../config/database'); // Arquivo de configuração da conexão com o MySQL

// Rota para cadastrar um prédio
router.post('/cadastrar', (req, res) => {
  const { nomePredio, cidade, bairro, rua, cor, medidas } = req.body;
  const query = `INSERT INTO predios (nome, cidade, bairro, rua, cor, medidas_sala, medidas_cozinha, medidas_banheiro, medidas_lavanderia, medidas_quarto, medidas_sacada) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [nomePredio, cidade, bairro, rua, cor, medidas.sala, medidas.cozinha, medidas.banheiro, medidas.lavanderia, medidas.quarto, medidas.sacada];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar o prédio:', err);
      res.status(500).json({ sucesso: false, mensagem: 'Erro ao cadastrar o prédio' });
      return;
    }
    res.status(201).json({ sucesso: true, mensagem: 'Prédio cadastrado com sucesso' });
  });
});

module.exports = router;
