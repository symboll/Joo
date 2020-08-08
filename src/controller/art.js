const { Movie, Sentence, Music } = require('../models/classic')

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
}

module.exports = {
  Art
}