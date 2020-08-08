const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../db')

class Favor extends Model{}

Favor.init({
  uid: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER,
},{
  sequelize,
  tableName: 'favor'
})

module.exports = {
  Favor
}