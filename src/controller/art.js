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
}

module.exports = {
  Art
}