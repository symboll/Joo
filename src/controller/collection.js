//收藏
const { Op } = require('sequelize')
const { sequelize } = require('../db/index')
const { Exception, Success } = require('../resModel')
const { Favor } = require('../models/favor')
const { Art } = require('./art')
class Collection {
  async done (ctx, next) {
    // 参数获取
    const { art_id, type, action } = ctx.request.body
    // 参数校验
    // art_id: Number(非负整数)/ 
    // type:  enum[100/200/300/400]
    // action  enum[thumbUp / cancel]

    const uid = ctx.auth.uid
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    let art;
    switch (action) {
      case 'thumbUp':
        if(favor) {
          throw new Exception('你已经点赞过', 400)
        }
        art = await Art.getData(art_id, type);
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
        art = await Art.getData(art_id, type);
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

  async list(ctx, next) {
    const uid = ctx.auth.uid

    const list = await Favor.findAll({
      where: {
        uid,
        type: {
          [Op.not]: 400
        }
      }
    })
    const arts = await Art.getList(list)
    const artsList = []
    arts.forEach(item => {
      const { delete_at, update_at, create_at, ...obj} = item.dataValues
      obj.image = `${ctx.origin}/static/${obj.image}`
      artsList.push(obj)
    })
    ctx.body = new Success('成功', 200,  artsList)
  }
}

module.exports = Collection;
