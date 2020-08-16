const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../db')

class Book extends Model{}

Book.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  index: Sequelize.INTEGER,
  image: Sequelize.STRING,
  author: Sequelize.STRING,
  fav_nums: Sequelize.INTEGER,
  title: Sequelize.STRING,
},{
  sequelize,
  tableName: 'book'
})

module.exports = {
  BookModel:Book
}