const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
	host: process.env.HOST,
    dialect: 'mysql',
    port: '3306',
    define: {
        timestamps: false
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
})

module.exports = { Sequelize, sequelize }