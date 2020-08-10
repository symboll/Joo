const { Op } = require('sequelize')
const { Movie, Sentence, Music } = require('../models/classic')
const { Favor } = require('../models/favor')
class Art {
  constructor () {

  }
  static async getData (art_id, type) {
    let art = null;
    switch (type) {
      case 100: 
        art = await Movie.findOne({
          where: { id: art_id }
        })
        break;
      case 200:
        art = await Music.findOne({
          where: { id: art_id }
        })
        break;
      case 300:
        art = await Sentence.findOne({
          where: { id: art_id }
        })
        break;
      // 书籍 book
      case 400:
        break;

      default :
        art = {}
    }

    return art;
  }

  static async isFavor (art_id,type,uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,type,uid
      }
    })

    return favor
  }

  static async getList (artInfoList) {
    const artInfoObj = {
      100: [],
      200: [],
      300: []
    }
    const arts = []
    artInfoList.forEach(item => {
      artInfoObj[item.type].push(item.art_id)
    })
    for(let key in artInfoObj) {
      if(artInfoObj[key].length === 0) { continue }
      arts.push(await Art._getListByType(artInfoObj[key], key))
    }
    return arts.flat(2)
  }
  static async _getListByType (ids, key) {
    let arts = []
    switch(Number(key)) {
      case 100:
        arts = await Movie.findAll({
          where: {
            id: { [Op.in]: ids }
          }
        })
        break;
      case 200:
        arts = await Music.findAll({
          where: {
            id: { [Op.in]: ids }
          }
        })
        break;
      case 300:
        arts = await Sentence.findAll({
          where: {
            id: { [Op.in]: ids }
          }
        })
        break;
      default: 
        break;
    }
    return arts
  }
}

module.exports = {
  Art
}