const Sequelize = require('sequelize');

const connection = new Sequelize('Neotelas', 'joseluiz', '9k8h5f4w', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;