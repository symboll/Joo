const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../db')

const basicFields = {
  image: Sequelize.STRING,
  context: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: Sequelize.INTEGER,
  title: Sequelize.STRING,
  type: Sequelize.INTEGER
}

// 电影
class Movie extends Model {}
Movie.init(basicFields,{
  sequelize,
  tableName: 'movie'
})

// 句子
class Sentence extends Model {}
Sentence.init(basicFields, {
  sequelize,
  tableName: 'sentence'
})

// 音乐
class Music extends Model {}
Music.init(Object.assign({url: Sequelize.STRING },basicFields),{
  sequelize,
  tableName: 'music'
})

module.exports = {
  Movie,
  Sentence,
  Music
}