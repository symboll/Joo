//收藏
const { sequelize } = require('../db/index')
const { Exception, Success } = require('../resModel')
const { Movie, Sentence, Music } = require('../models/classic')
const { Favor } = require('../models/favor')
const { Art } = require('./art')
class Collection {
  async done (ctx, next) {
    const { art_id, type, action } = ctx.request.body
    const uid = ctx.auth.uid
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    const art = await Art.getData(art_id, type)
    switch (action) {
      case 'thumbUp':
        if(favor) {
          throw new Exception('你已经点赞过', 400)
        }
        try {
          sequelize.transaction(async t=> {
            await Favor.create(
              { art_id,type,uid}, 
              {transaction: t}
            )
            
            await art.increment(
              'fav_nums',
              { by: 1, transaction: t }
            )
          })
          ctx.body = new Success('成功',201)
        }catch (e) {
          throw new Exception(`出现异常${e}`)
        }
        break;
      case 'cancel':
        if(!favor) {
          throw new Exception('你还没有点赞过', 400)
        }
        try {
          sequelize.transaction(async t=> {
            await Favor.destroy(
              { where : { art_id }}, 
              {transaction: t}
            )
            
            await art.decrement(
              'fav_nums',
              { by: 1, transaction: t }
            )
          })
          ctx.body = new Success('成功',201)
        }catch (e) {
          throw new Exception(`出现异常${e}`)
        }
        break;
      default:
    }
  }
}

module.exports = {
  Collection
}