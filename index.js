const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('img'));

// Conexão com o MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'joseluiz',
  password: '9k8h5f4w',
  database: 'Neotelas'
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conexão com o MySQL estabelecida');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/cadastrar', (req, res) => {
  const { nomePredio, cidade, bairro, rua, cor, medidas_sala, medidas_cozinha, medidas_banheiro, medidas_lavanderia, medidas_quarto, medidas_sacada } = req.body;
  
  const query = `INSERT INTO predios (nome, cidade, bairro, rua, cor, medidas_sala, medidas_cozinha, medidas_banheiro, medidas_lavanderia, medidas_quarto, medidas_sacada) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  const values = [nomePredio, cidade, bairro, rua, cor, medidas_sala, medidas_cozinha, medidas_banheiro, medidas_lavanderia, medidas_quarto, medidas_sacada];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar o prédio:', err);
      res.redirect('/cadastrar_predio.html?sucesso=false');
      return;
    }
    res.redirect('/cadastrar_predio.html?sucesso=true');
  });
});



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/home.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/cadastrar_predio.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'cadastrar_predio.html'));
});

app.get('/procurar_predio.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'procurar_predio.html'));
});

app.get('/predios', (req, res) => {
  const query = `SELECT * FROM predios`;

  connection.query(query, (err, result) => {
    if (err) {
      console.error('Erro ao buscar prédios:', err);
      res.send('Erro');
      return;
    }
    res.json({ sucesso: true, predios: result });
  });
});


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
