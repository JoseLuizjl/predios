const Sequelize = require('sequelize');
const connection = require('./data');
const cadastroPredio = connection.define('predio', {
    nomePredio: {
        type: Sequelize.STRING,
        allowNull: false
    },

    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },

    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },

    bairro: {
        type: Sequelize.STRING,
        allowNull: false
    },

   rua: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cor: {
        type: Sequelize.STRING,
        allowNull: false
    },

    medidas_sala: {
        type: Sequelize.STRING,
        allowNull: false
    },

    medidas_cozinha: {
        type: Sequelize.STRING,
        allowNull: false
    },

    medidas_banheiro: {
        type: Sequelize.STRING,
        allowNull: false
    },

    medidas_lavandeiria: {
        type: Sequelize.STRING,
        allowNull: false
    },

    medidas_quarto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    medidas_sacada: {
        type: Sequelize.STRING,
        allowNull: false
    },

})
cadastroPredio.sync({ force: false }).then(() => {
    console.log("Tabela Criada");
});

module.exports = cadastroPredio;