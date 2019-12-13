const Sequelize = require('sequelize')

const dbUrl = 'postgres://postgres:missme@localhost:5432/postgres'

const db = new Sequelize(dbUrl)

db.sync({force: false})
	.then(() => console.log("Db connected"))

module.exports = db	
