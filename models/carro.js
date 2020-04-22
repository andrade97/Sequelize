const { Sequelize } = require("sequelize");

const conexao = require("../database/conexao");

const Carro = conexao.define('carro', 
    {
        marca: Sequelize.TEXT,
        modelo: Sequelize.TEXT,
        ano: Sequelize.INTEGER,
        valor: Sequelize.DOUBLE,
        data_cadastro: Sequelize.DATE
    },
    {
        timestamps: false,
        tableName: 'carro'
    }
);

module.exports = Carro;