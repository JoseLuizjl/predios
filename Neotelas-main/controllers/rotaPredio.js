const rotaPredio = require("../database/predio")
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
 
exports.postCriarpredio = (req, res) =>{
    if (!req.body) {
        return res.status(400).json({
            error: true,
            message: 'Corpo da requisição vazio.'
          
        });
    }
    const { nomePredio, cidade, bairro, rua, cor, medidas_sala, medidas_cozinha, medidas_banheiro, medidas_lavandeiria, medidas_quarto,medidas_sacada } = req.body;
    if (!nomePredio || !cidade || !bairro || !rua || !cor || !medidas_sala || !medidas_cozinha || !medidas_banheiro || !medidas_lavandeiria || !medidas_quarto || !medidas_sacada) {
        return res.status(400).json({
            error: true,
            message: 'Dados incompletos na requisição.'
        });
    }   
    rotaPredio.create({
        nomePredio, 
        cidade, 
        bairro,
        rua,
        cor, 
        medidas_sala,
        medidas_cozinha,
        medidas_banheiro,
        medidas_lavandeiria,
        medidas_quarto,
        medidas_sacada
    }).then(status => res.status(201).json({
    error: false,
    menssage: 'Cadastro Feito com sucesso!!'
    }))
        .catch(error => res.json({
        error: true,
        error: error
    }))
}
exports.getListarPredios = (req, res) =>{
    rotaPredio.findAll({
        raw:true
    }).then(arq => res.json({
        error: false,
        data: arq
    }))    
}

exports.getPesquisarPredios = (req, res) =>{
    const nomePredio = req.params.nomePredio;
    
    if (nomePredio === undefined) {
        return res.sendStatus(400);
    }

    rotaPredio.findOne({
        where:{
            nomePredio: nomePredio
        }         
    }).then(predio =>{
        if (predio != undefined) {
            res.statusCode = 200;
            res.json(predio)
        }else{
            res.sendStatus(404);
        }
    }).catch(error =>{
        console.log(error);
        res.sendStatus(500)
    })

}

exports.putPredio = (req, res) => {
    const { id } = req.params;
    const { nomePredio, cidade, bairro, rua, cor, medidas_sala, medidas_cozinha, medidas_banheiro, medidas_lavandeiria, medidas_quarto, medidas_sacada } = req.body;

    if (!id || !nomePredio || !cidade || !bairro || !rua || !cor || !medidas_sala || !medidas_cozinha || !medidas_banheiro || !medidas_lavandeiria || !medidas_quarto || !medidas_sacada) {
        return res.status(400).json({ error: true, message: "Todos os campos são obrigatórios." });
    }


    if (isNaN(id)) {
        return res.status(400).json({ error: true, message: "ID inválido." });
    }

    rotaPredio.findByPk(id)
        .then(predio => {
            if (!predio) {
                return res.status(404).json({ error: true, message: "Prédio não encontrado." });
            }

            predio.nomePredio = nomePredio;
            predio.cidade = cidade;
            predio.bairro = bairro;
            predio.rua = rua;
            predio.cor = cor;
            predio.medidas_sala = medidas_sala;
            predio.medidas_cozinha = medidas_cozinha;
            predio.medidas_banheiro = medidas_banheiro;
            predio.medidas_lavandeiria = medidas_lavandeiria;
            predio.medidas_quarto = medidas_quarto;
            predio.medidas_sacada = medidas_sacada;

            return predio.save();
        })
        .then(updatedPredio => {
            res.status(200).json({ error: false, message: "Prédio atualizado com sucesso.", predio: updatedPredio });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: true, message: "Ocorreu um erro ao atualizar o prédio." });
        });
};
