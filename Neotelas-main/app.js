const express = require("express");
const app = express();
const connection = require("./database/data");
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const predioController = require('./controllers/rotaPredio')

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

app.post("/cadastroPredio", predioController.postCriarpredio)
app.get("/listasPredio", predioController.getListarPredios)
app.get("/procurar_predio/:nomePredio", predioController.getPesquisarPredios)
app.put("/atualizaPredio/:id", predioController.putPredio)
app.listen(process.env.PORT || 8080, () => {
    console.log("API RODANDO!")
})